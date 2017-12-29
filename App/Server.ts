import layer from "./2.Application/Server/Layer"

import {interfaces} from "inversify"
import {IServerApplication, IServerApplicationKey} from "./0.Bootstrap/Common/Application/IServerApplication"

import * as process from "process"
process.chdir('Dist/App');

layer.Initialize();
let server = layer.container.get<IServerApplication>(IServerApplicationKey);
server.Bootstrap();