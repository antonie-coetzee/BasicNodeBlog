import layer from "2.Application/Server/Layer"
import {Container, interfaces} from "inversify"

import { ILoggerFactory, ILoggerFactoryKey } from "1.Framework/Common/Services/Logging/ILoggerFactory";
import { loggingModule } from "1.Framework/Common/Services/Logging/LoggingModule";
import { LoggerFactory } from "1.Framework/Client/Lib/Logging/LoggingFactory";
import { IServerListen, IServerListenKey } from "1.Framework/Common/Server/IServerListen";
import { ServiceWorkerListen } from "./ServiceWorkerListen";
import { MiddlewareContainerModule } from "./MiddleWare/MiddlewareContainerModule";
import { IClientCache, IClientCacheKey } from "2.Application/Client/ServiceWorker/ClientCache/IClientCache";
import { ClientCache } from "./ClientCache/ClientCache";

layer.AddLayer((container)=>{
    container.load(loggingModule);  
    container.bind<ILoggerFactory>(ILoggerFactoryKey).to(LoggerFactory);
    container.bind<IServerListen>(IServerListenKey).to(ServiceWorkerListen);
    container.bind<IClientCache>(IClientCacheKey).toConstantValue(new ClientCache());
    container.load(MiddlewareContainerModule)
});

export default layer; 