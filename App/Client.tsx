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

const Application = layer.container.get<interfaces.Newable<IClientApplication>>(IClientApplicationKey);

ReactDOM.render(
        <Router history={history}>
            <Application/>
        </Router>,
    document.getElementById("root")
); 

