const url = require('url')

function expressService (app){
  const cacheName = 'client-cache'
  const myName = 'express-service'
  console.log(myName, 'startup')

  self.addEventListener('install', function (event) {
    console.log(myName, 'installed')
  })

  self.addEventListener('activate', function () {
    console.log(myName, 'activated')
    event.waitUntil(caches.delete(cacheName));
  })

  self.addEventListener('fetch', function (event) {
    const parsedUrl = url.parse(event.request.url)
    console.log(myName, 'fetching page', parsedUrl.path)

    event.respondWith(new Promise(function (resolve) {
      // let Express handle the request, but get the result
      console.log(myName, 'handle request', JSON.stringify(parsedUrl, null, 2))
      event.request.clone().text().then(function (text) {
        var body = text

        var req = {
          requestInfo: event.request,
          url: parsedUrl.href,
          method: event.request.method,
          body: body,
          headers: {
          //    'content-type': event.request.headers.get('content-type')
          },
          unpipe: function () {},
          connection: {
            remoteAddress: '::1'
          },
          resume: function(){}
        }
        for (var _iterator = event.request.headers.entries(), _step; !(_step = _iterator.next()).done;) {
          var header = _step.value;
          req.headers[header[0]] = header[1];
        }
    
        var res = {
          _headers: {},
          setHeader: function setHeader (name, value) {
            this._headers[name] = value
          },
          getHeader: function getHeader (name) {
            return this._headers[name]
          },
          get: function get (name) {
            return this._headers[name]
          }
        }

        function endWithFinish (chunk, encoding) {
          console.log('ending response for request', req.url)
          console.log('output "%s ..."', chunk.toString().substr(0, 10))
          console.log('%d %s %s', res.statusCode || 200,
            res.get('Content-Type'),
            res.get('Content-Length'))
          // end.apply(res, arguments)
          const responseOptions = {
            status: res.statusCode || 200,
            headers: {
              'Content-Length': res.get('Content-Length'),
              'Content-Type': res.get('Content-Type')
            }
          }
          if (res.get('Location')) {
            responseOptions.headers.Location = res.get('Location')
          }
          if (res.get('X-Powered-By')) {
            responseOptions.headers['X-Powered-By'] = res.get('X-Powered-By')
          }
          resolve(new Response(chunk, responseOptions))
        }

        res.end = endWithFinish
        app(req, res)
      })
    }))
  })
}

module.exports = expressService
