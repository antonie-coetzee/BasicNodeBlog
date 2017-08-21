import layer from '../../0.Bootstrap/Client/Layer'

import {loggingModule} from "../Common/Services/Logging/LoggingModule"
import {ILoggerFactory, ILoggerFactoryKey} from "../Common/Services/Logging/ILoggerFactory"
import {LoggerFactory} from "./Lib/Logging/LoggingFactory"

import {IClientApplication, IClientApplicationKey} from "../../0.Bootstrap/Common/Application/IClientApplication"
import {ClientApplication} from "./Application/ClientApplication"

layer.AddLayer((container)=>{
    container.load(loggingModule);  
    container.bind<ILoggerFactory>(ILoggerFactoryKey).to(LoggerFactory);
    container.bind<IClientApplication>(IClientApplicationKey).toConstructor(ClientApplication);
})

export default layer;
