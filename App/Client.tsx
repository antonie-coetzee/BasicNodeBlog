import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Route} from 'react-router-dom'
import {interfaces} from "inversify"
import {IClientApplication, IClientApplicationKey} from "./0.Bootstrap/Common/Application/IClientApplication"

import layer from "./2.Application/Client/Layer"

layer.Initialize();
const Application = layer.container.get<interfaces.Newable<IClientApplication>>(IClientApplicationKey);

ReactDOM.render(
    <BrowserRouter>
        <Application/>
    </BrowserRouter>,
    document.getElementById("root")
); 