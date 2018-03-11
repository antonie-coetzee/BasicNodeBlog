//async entry point for loading the service worker on the index page
////////////////////////////////////////////////////////////////////
var serviceScriptUrl = '/serviceworker.js'
var scope = '/'

function registeredWorker (registration) {
  console.log('express-service registered...')
}

function onError (err) {
  if (err.message.indexOf('missing active') !== -1) {
    // the service worker is installed
    console.log('the service worker is installed')
  } else {
    console.error('express service worker error', err)
  }
}

if ('serviceWorker' in window.navigator) {
  window.navigator.serviceWorker
  .register(serviceScriptUrl, { scope: scope })
  .then(registeredWorker)
  .catch(onError)
}else{
  console.log('serviceWorker not available or supported, skipping install');
}



