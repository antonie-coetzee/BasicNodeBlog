import {Container} from "inversify"

import {IServer,IServerKey} from "./IServer"
import {BnbContainerBuilder} from './ContainerBuilder'

let container = new BnbContainerBuilder().build();
let server = container.get<IServer>(IServerKey);

server.bootstrap();