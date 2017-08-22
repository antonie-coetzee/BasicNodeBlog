import layer from '../../0.Bootstrap/Client/Layer'

import {loggingModule} from "../Common/Services/Logging/LoggingModule"
import {ILoggerFactory, ILoggerFactoryKey} from "../Common/Services/Logging/ILoggerFactory"
import {LoggerFactory} from "./Lib/Logging/LoggingFactory"

import {IClientApplication, IClientApplicationKey} from "../../0.Bootstrap/Common/Application/IClientApplication"
import {ClientApplication} from "./Application/ClientApplication"

import {IContainer, IContainerKey} from "./Container/IContainer"
import {Container} from "./Container/Container"

layer.AddLayer((container)=>{
    container.load(loggingModule);  
    container.bind<ILoggerFactory>(ILoggerFactoryKey).to(LoggerFactory);
    container.bind<IClientApplication>(IClientApplicationKey).toConstructor(ClientApplication);
    container.bind<IContainer>(IContainerKey).toConstructor(Container);
})

export default layer;
