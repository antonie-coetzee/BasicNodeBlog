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
        let dir = path.resolve(__dirname + '/../public');
        logger.debug("serving static files from: %s", dir);
        this.app.use('/', express.static(dir));

        // add API routers
        logger.debug("loading API modules");
        let modules = this.apiModules;
        if(modules != null){
            modules.forEach(element => {
                let apiPath = '/api/' + element.basePath;
                logger.debug("adding module at: %s", apiPath);
                let router = express.Router();
                this.app.use(apiPath, element.ConfigureRouter(router));
            });
        }

        this.app.get('/*', function(req, res){
            res.sendFile(dir + '/index.html');
        });
        
        this.app.listen(8080, function () {
            logger.debug("listening on port: %s", "8080");
        })
        return this;
    }
}