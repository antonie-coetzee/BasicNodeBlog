import {IServerApplication, IServerApplicationKey} from "../../../0.Bootstrap/Common/Application/IServerApplication"
import {IExpressApplication, IExpressApplicationKey} from "./IExpressApplication"

import { injectable, inject, Container, interfaces,multiInject } from "inversify";
import "reflect-metadata";
import {ILogger, ILoggerKey} from "../../Common/Services/Logging/ILogger"

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";

import {IMiddleware, IMiddlewareKey} from "./../Middleware/IMiddleware"
import {IApiModule, IApiModuleKey} from "./../api/Rest/IApimodule"

@injectable()
export class ServerApplication implements IServerApplication {

    constructor(@inject(IExpressApplicationKey) private app:IExpressApplication,  
                @multiInject(IMiddlewareKey) private middleware: IMiddleware[], 
                @multiInject(IApiModuleKey) private apiModules: IApiModule[], 
                @inject(ILoggerKey) private logger:ILogger) {}
    
    Bootstrap(){
        // 
        let dir = path.resolve(__dirname + '/../../../public');
        this.logger.Debug("serving static files from: %s", dir);
        this.app.instance.use('/', express.static(dir));

        // add middleware
        this.logger.Debug("loading middleware, from high to low priority");
        if(this.middleware != null){
            this.middleware.sort((a,b)=>a.priority - b.priority);
            this.middleware.forEach(element => {
                this.logger.Debug(`adding middleware with name: "${element.name}" and priority: ${element.priority} at: ${element.path}`);
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

        // client side routing, server to return index
        this.app.instance.get('/*', function(req, res){
            res.sendFile(dir + '/index.html');
        });
        
        // TODO: sort out with config
        this.app.instance.listen(8080, ()=> {
            this.logger.Info("listening on port: %s", "8080");
        })
        return this;
    }
}