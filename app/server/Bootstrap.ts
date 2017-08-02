import {Container} from "inversify"
import * as logger from "winston"

import {IServer,IServerKey} from "./IServer"
import {ContainerBuilder} from './ContainerBuilder'
import {ContentReader} from './lib/ContentReader/ContentReader'

logger.add(logger.transports.File, { filename: __dirname + '/server.log' });
logger.configure({level: "debug"});

logger.debug("building server container");
let container = new ContainerBuilder().build();
let server = container.get<IServer>(IServerKey);
logger.debug("boostrapping server");
server.bootstrap();
