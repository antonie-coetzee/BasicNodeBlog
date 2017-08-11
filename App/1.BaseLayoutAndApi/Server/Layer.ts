import layer from '../../0.Bootstrap/Server/Layer'
import {Container, interfaces} from "inversify"
import * as express from "express";

import {IConfig, IConfigKey} from "./config/IConfig"
import Config from "./config/Config"

import {ILogger, ILoggerKey} from "../Common/Services/Logging/ILogger"

import {ILoggerFactory, ILoggerFactoryKey} from "../Common/Services/Logging/ILoggerFactory"
import {LoggerFactory} from "../Common/Services/Logging/LoggerFactory"

import {ILoggerConfig, ILoggerConfigKey} from "../Common/Services/Logging/ILoggerConfig"
import {ServerLoggerConfig} from "./Config/ServerLoggerConfig"

import {IExpressApplication,IExpressApplicationKey} from "./Application/IExpressApplication"
import {ExpressApplication} from "./Application/ExpressApplication"

import  {IServerApplication,IServerApplicationKey} from "../../0.Bootstrap/Common/Application/IServerApplication"
import  {ServerApplication} from "./Application/ServerApplication"

import {apiContainerModule} from "./api/ApiContainerModule"

layer.AddLayer((container)=>{
    container.bind<IConfig>(IConfigKey).to(Config);

    container.bind<ILoggerConfig>(ILoggerConfigKey).to(ServerLoggerConfig);
    container.bind<ILoggerFactory>(ILoggerFactoryKey).to(LoggerFactory).inSingletonScope();
    container.bind<ILogger>(ILoggerKey).toDynamicValue(
        (context)=>{
            let factory = context.container.get<ILoggerFactory>(ILoggerFactoryKey);
            let binding = context.plan.rootRequest.bindings[0]; //take first binding
            return factory.Create(binding.implementationType.name);
        });

    container.bind<IExpressApplication>(IExpressApplicationKey).to(ExpressApplication).inSingletonScope();
    container.bind<IServerApplication>(IServerApplicationKey).to(ServerApplication);
    container.load(apiContainerModule);    
})

export default layer;