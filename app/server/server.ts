import { injectable, inject, Container, interfaces,multiInject } from "inversify";
import "reflect-metadata";
import * as logger from "winston"

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";

import {IApiModule, IApiModuleKey} from "./api/IApimodule"
import {IServer, IServerKey} from "./IServer"

@injectable()
export class Server implements IServer {
    public app: express.Application;

    constructor(@multiInject(IApiModuleKey) private apiModules: IApiModule[]) {}
    
    bootstrap(){
        this.app = express();
        let dir = __dirname + '/../public';
        logger.debug("serving static files from: %s", dir);
        this.app.use('/', express.static(dir));

        // add API routers
        logger.debug("loading API modules");
        let modules = this.apiModules;
        if(modules != null){
            modules.forEach(element => {
                logger.debug("adding module at path: %s", element.basePath);
                let router = express.Router();
                this.app.use('/api/' + element.basePath, element.ConfigureRouter(router));
            });
        }

        this.app.listen(8080, function () {
            logger.debug("listening on port: %s", "8080");
        })
        return this;
    }
}