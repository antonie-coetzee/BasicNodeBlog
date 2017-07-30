import layer from "Client/1.BaseLayoutAndRouting/Layer"

import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Route} from 'react-router-dom'
import {interfaces} from "inversify"

import {IApplication, IApplicationKey} from "./IApplication"

layer.Initialize();
const Application = layer.container.get<interfaces.Newable<IApplication>>(IApplicationKey);

ReactDOM.render(
                <BrowserRouter>   
                    <Application/>
                </BrowserRouter>
                ,
    document.getElementById("root")
); 