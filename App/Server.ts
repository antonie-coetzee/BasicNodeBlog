import layer from "./1.BaseLayoutAndRouting/Server/Layer"

import {interfaces} from "inversify"
import {IServerApplication, IServerApplicationKey} from "./0.Bootstrap/Common/Application/IServerApplication"

layer.Initialize();
let server = layer.container.get<IServerApplication>(IServerApplicationKey);
server.Bootstrap();