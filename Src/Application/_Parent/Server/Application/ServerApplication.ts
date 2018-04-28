import "reflect-metadata";

import {IServerApplication, IServerApplicationKey} from "../../_Parent/Common/Application/IServerApplication"
import {IExpressApplication, IExpressApplicationKey} from "./IExpressApplication"
import {injectable, inject, Container, interfaces,multiInject, optional} from "inversify";
import {ILogger, ILoggerKey} from "../../Common/Services/Logging/ILogger"

import * as express from "express";

import {IMiddleware, IMiddlewareKey} from "../Middleware/IMiddleware"
import {IApiModule, IApiModuleKey} from "../Api/IApiModule"
import { IServerListenKey, IServerListen } from "../../Common/Server/IServerListen";

@injectable()
export class ServerApplication implements IServerApplication {

    constructor(@inject(IExpressApplicationKey) private app:IExpressApplication,  
                @multiInject(IMiddlewareKey) @optional() private middleware: IMiddleware[] = [], 
                @multiInject(IApiModuleKey) @optional() private apiModules: IApiModule[] = [], 
                @inject(IServerListenKey) private serverListen:IServerListen,
                @inject(ILoggerKey) private logger:ILogger) {}
    
    Bootstrap(){
        // add middleware
        this.logger.Debug("loading middleware");
        if(this.middleware != null){
            this.middleware.sort((a,b)=>a.priority - b.priority);
            this.middleware.forEach(element => {
                this.logger.Debug(`adding middleware: "${element.name}", priority: ${element.priority}, at: ${element.path}`);
                this.app.instance.use(element.path, element.handlers);
            });
        }

        // add API routers
        this.logger.Debug("loading routes");
        let modules = this.apiModules;
        if(modules != null){
            modules.forEach(element => {
                let apiPath = element.basePath;
                this.logger.Debug("adding module at: %s", apiPath);
                let router = express.Router();
                this.app.instance.use(apiPath, element.ConfigureRouter(router));
            });
        }

        let errorlogger = this.logger;
        // error logger
        this.app.instance.use(function(err,req,res,next){
            if(err.stack){
                errorlogger.Error(err.stack);
            }else{
                errorlogger.Error(err);
            }   
            next(err);
        });

        this.serverListen.Listen(this.app);
        
        return this;
    }
}