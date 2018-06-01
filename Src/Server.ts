import 'es6-map/implement'
import layer from "Application/Server/Layer"

import {interfaces} from "inversify"
import { IServerApplication, IServerApplicationKey } from 'Application/_Parent/_Parent/Common/Application/IServerApplication';

import * as process from "process"
process.chdir('Dist/Src/Application');

layer.Initialize();
let server = layer.container.get<IServerApplication>(IServerApplicationKey);
server.Bootstrap();