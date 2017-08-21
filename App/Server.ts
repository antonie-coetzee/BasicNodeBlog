import layer from "./2.Application/Server/Layer"

import {interfaces} from "inversify"
import {IServerApplication, IServerApplicationKey} from "./0.Bootstrap/Common/Application/IServerApplication"

layer.Initialize();
let server = layer.container.get<IServerApplication>(IServerApplicationKey);
server.Bootstrap();