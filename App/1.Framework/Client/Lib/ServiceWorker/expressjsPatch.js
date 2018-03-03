if (typeof global.XMLHttpRequest === 'undefined') {
    global.XMLHttpRequest = function XMLHttpRequest () {
                              this.open = function open () {}
                            }
}

process.hrtime = performance.now.bind(performance)

process.stdout = {
    write: function (str) {
      console.log(str)
    }
}

var http = require('http')
if (!http.IncomingMessage) {
  http.IncomingMessage = {}
  http.IncomingMessage.prototype = {};
}

if (!http.ServerResponse) {
  http.ServerResponseProto = {
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
  http.ServerResponse = Object.create({}, http.ServerResponseProto)
  http.ServerResponse.prototype = {};
}

if (typeof setImmediate === 'undefined') {
    global.setImmediate = function setImmediate (cb, param) {
        setTimeout(cb.bind(null, param), 0)
    }
}