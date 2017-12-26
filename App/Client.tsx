import "es6-symbol/implement"
import "es6-promise/auto"

import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Route} from 'react-router-dom';
import {interfaces} from "inversify";

import layer from "./2.Application/Client/Layer"
import {IClientApplication, IClientApplicationKey} from "./0.Bootstrap/Common/Application/IClientApplication"

import "./Style.sass"

layer.Initialize();
const Application = layer.container.get<interfaces.Newable<IClientApplication>>(IClientApplicationKey);

ReactDOM.render(
        <BrowserRouter>
            <Application/>
        </BrowserRouter>,
    document.getElementById("root")
); 

