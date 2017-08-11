import {IServerApplication, IServerApplicationKey} from "../../../0.Bootstrap/Common/Application/IServerApplication"
import {IExpressApplication, IExpressApplicationKey} from "./IExpressApplication"

import { injectable, inject, Container, interfaces,multiInject } from "inversify";
import "reflect-metadata";
import * as logger from "winston"

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";

import {IApiModule, IApiModuleKey} from "./../api/IApimodule"

@injectable()
export class ServerApplication implements IServerApplication {

    constructor(@inject(IExpressApplicationKey) private app:IExpressApplication,  
                @multiInject(IApiModuleKey) private apiModules: IApiModule[]) {}
    
    Bootstrap(){
        let dir = path.resolve(__dirname + '/../../../public');
        logger.debug("serving static files from: %s", dir);
        this.app.instance.use('/', express.static(dir));

        // add API routers
        logger.debug("loading API modules");
        let modules = this.apiModules;
        if(modules != null){
            modules.forEach(element => {
                let apiPath = '/api/' + element.basePath;
                logger.debug("adding module at: %s", apiPath);
                let router = express.Router();
                this.app.instance.use(apiPath, element.ConfigureRouter(router));
            });
        }

        this.app.instance.get('/*', function(req, res){
            res.sendFile(dir + '/index.html');
        });
        
        this.app.instance.listen(8080, function () {
            logger.debug("listening on port: %s", "8080");
        })
        return this;
    }
}