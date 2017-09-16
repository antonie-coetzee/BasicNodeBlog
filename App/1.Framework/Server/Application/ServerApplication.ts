import "reflect-metadata";

import {IServerApplication, IServerApplicationKey} from "../../../0.Bootstrap/Common/Application/IServerApplication"
import {IExpressApplication, IExpressApplicationKey} from "./IExpressApplication"
import {injectable, inject, Container, interfaces,multiInject} from "inversify";
import {ILogger, ILoggerKey} from "../../Common/Services/Logging/ILogger"

import * as express from "express";

import {IMiddleware, IMiddlewareKey} from "./../Middleware/IMiddleware"
import {IApiModule, IApiModuleKey} from "./../Api/IApiModule"

@injectable()
export class ServerApplication implements IServerApplication {

    constructor(@inject(IExpressApplicationKey) private app:IExpressApplication,  
                @multiInject(IMiddlewareKey) private middleware: IMiddleware[], 
                @multiInject(IApiModuleKey) private apiModules: IApiModule[], 
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
        this.logger.Debug("loading API modules");
        let modules = this.apiModules;
        if(modules != null){
            modules.forEach(element => {
                let apiPath = '/api/' + element.basePath;
                this.logger.Debug("adding module at: %s", apiPath);
                let router = express.Router();
                this.app.instance.use(apiPath, element.ConfigureRouter(router));
            });
        }
        
        // TODO: sort out with config
        this.app.instance.listen(8080, ()=> {
            this.logger.Info("listening on port: %s", "8080");
        })
        return this;
    }
}