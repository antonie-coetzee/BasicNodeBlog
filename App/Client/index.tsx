import layer from "client/2.SearchComponent/Layer"

import * as React from "react";
import * as ReactDOM from "react-dom";
import {interfaces} from "inversify"

import {IApplication, IApplicationKey} from "Client/Contracts/IApplication"

const Application = layer.container.get<interfaces.Newable<IApplication>>(IApplicationKey);

ReactDOM.render(
    <Application/>,
    document.getElementById("root")
); 