import {Container} from "inversify"

import {IServer,IServerSymbol} from "./IServer"
import {BnbContainerBuilder} from './ContainerBuilder'

import {IApiModule, IApiModuleSymbol} from "./api/IApiModule"

let container = new BnbContainerBuilder().build();
let apiModule = container.get<IApiModule>(IApiModuleSymbol);
let server = container.get<IServer>(IServerSymbol);

server.bootstrap();