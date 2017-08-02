import {Container} from "inversify"
import * as winston from "winston"

import {IServer,IServerKey} from "./IServer"
import {ContainerBuilder} from './ContainerBuilder'
import {ContentReader} from './lib/ContentReader/ContentReader'


winston.configure({level:'debug', transports: [new winston.transports.Console()]});

winston.debug("building server container");
let container = new ContainerBuilder().build();
let server = container.get<IServer>(IServerKey);
winston.debug("boostrapping server");
server.bootstrap();
