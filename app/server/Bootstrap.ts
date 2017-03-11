import {Container} from "inversify"

import {IServer,IServerSymbol} from "./IServer"
import {BnbContainerBuilder} from './ContainerBuilder'

let container = new BnbContainerBuilder().build();
let server = container.get<IServer>(IServerSymbol);

server.bootstrap();