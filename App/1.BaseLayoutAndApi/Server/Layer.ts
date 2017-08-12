import layer from '../../0.Bootstrap/Server/Layer'
import {Container, interfaces} from "inversify"
import * as express from "express";

import {IConfig, IConfigKey} from "./config/IConfig"
import Config from "./config/Config"

import {loggingModule} from "../Common/Services/Logging/LoggingModule"

import {ILoggerConfig, ILoggerConfigKey} from "../Server/Lib/Logging/ILoggerConfig"
import {LoggerConfig} from "./Config/LoggerConfig"
import {ILoggerFactory,ILoggerFactoryKey} from "../Common/Services/Logging/ILoggerFactory"
import {LoggerFactory} from "../Server/Lib/Logging/LoggerFactory"

import {IExpressApplication,IExpressApplicationKey} from "./Application/IExpressApplication"
import {ExpressApplication} from "./Application/ExpressApplication"

import  {IServerApplication,IServerApplicationKey} from "../../0.Bootstrap/Common/Application/IServerApplication"
import  {ServerApplication} from "./Application/ServerApplication"

import {apiContainerModule} from "./api/ApiContainerModule"

layer.AddLayer((container)=>{
    container.bind<IConfig>(IConfigKey).to(Config).inSingletonScope();

    container.load(loggingModule);
    container.bind<ILoggerConfig>(ILoggerConfigKey).to(LoggerConfig);
    container.bind<ILoggerFactory>(ILoggerFactoryKey).to(LoggerFactory);

    container.bind<IExpressApplication>(IExpressApplicationKey).to(ExpressApplication).inSingletonScope();
    container.bind<IServerApplication>(IServerApplicationKey).to(ServerApplication);
    container.load(apiContainerModule);    
})

export default layer;