import "es6-symbol/implement"
import "es6-promise/auto"

import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import {interfaces} from "inversify";

import layer from "2.Application/Client/Layer"
import {IClientApplication, IClientApplicationKey} from "0.Bootstrap/Common/Application/IClientApplication"

import "Style.sass"

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
layer.container.bind<RouterStore>(RouterStore).toConstantValue(routingStore);

layer.Initialize();

import { useStrict } from 'mobx';
useStrict(true);

var serviceScriptUrl = '/serviceworker.js'
var scope = '/'

function registeredWorker (registration) {
    console.log('express-service registered...')
    // let the Express take over, even the index page
    //window.location.reload()
  }

  function onError (err) {
    if (err.message.indexOf('missing active') !== -1) {
      // the service worker is installed
      console.log('the service worker is installed')
      //window.location.reload()
    } else {
      console.error('express service worker error', err)
    }
}

window.navigator.serviceWorker.register(serviceScriptUrl, { scope: scope })
.then(registeredWorker)
.catch(onError)

const Application = layer.container.get<interfaces.Newable<IClientApplication>>(IClientApplicationKey);

ReactDOM.render(
        <Router history={history}>
            <Application/>
        </Router>,
    document.getElementById("root")
); 

