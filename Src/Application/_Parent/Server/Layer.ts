import layer from '../_Parent/Server/Layer'

import {Container, interfaces} from "inversify"
import * as express from "express";

import {IConfig, IConfigKey} from "./Config/IConfig"
import Config from "./Config/Config"

import {loggingModule} from "../Common/Services/Logging/LoggingModule"
import {ILoggerConfig, ILoggerConfigKey} from "../Server/Lib/Logging/ILoggerConfig"
import {LoggerConfig} from "./Config/LoggerConfig"
import {ILoggerFactory,ILoggerFactoryKey} from "../Common/Services/Logging/ILoggerFactory"
import {LoggerFactory} from "../Server/Lib/Logging/LoggerFactory"

import { IServerListen, IServerListenKey } from '../Common/Server/IServerListen';
import { ServerListen } from '../Server/Application/ServerListen';

import {IExpressApplication,IExpressApplicationKey} from "./Application/IExpressApplication"
import {ExpressApplication} from "./Application/ExpressApplication"

import  {IServerApplication,IServerApplicationKey} from "../_Parent/Common/Application/IServerApplication"
import  {ServerApplication} from "./Application/ServerApplication"

layer.AddLayer((container)=>{
    container.bind<interfaces.Container>(Container).toConstantValue(layer.container);
    container.bind<IConfig>(IConfigKey).to(Config).inSingletonScope();
    container.load(loggingModule);
    container.bind<ILoggerConfig>(ILoggerConfigKey).to(LoggerConfig);
    container.bind<ILoggerFactory>(ILoggerFactoryKey).to(LoggerFactory);
    container.bind<IServerListen>(IServerListenKey).to(ServerListen);
    container.bind<IExpressApplication>(IExpressApplicationKey).to(ExpressApplication).inSingletonScope();
    container.bind<IServerApplication>(IServerApplicationKey).to(ServerApplication);   
})

export default layer;