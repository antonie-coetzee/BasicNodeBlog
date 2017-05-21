import {Container} from "inversify"

import {IServer,IServerKey} from "./IServer"
import {ContainerBuilder} from './ContainerBuilder'

let container = new ContainerBuilder().build();
let server = container.get<IServer>(IServerKey);

server.bootstrap();