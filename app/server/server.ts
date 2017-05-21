import { injectable, inject, Container, interfaces,multiInject } from "inversify";
import "reflect-metadata";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";

import {IApiModule, IApiModuleKey} from "./api/IApimodule"
import {IServer, IServerKey} from "./IServer"

@injectable()
export class Server implements IServer {
    public app: express.Application;

    constructor(@multiInject(IApiModuleKey) private apiModules: IApiModule[]) {}
    
    bootstrap(){
        this.app = express();
        this.app.use('/', express.static(__dirname + '/../public'))

        // add API routers
        let modules = this.apiModules;
        if(modules != null){
            modules.forEach(element => {
                console.log(`server: adding api module at, ${element.basePath}`);
                let router = express.Router();
                this.app.use('/api/' + element.basePath, element.ConfigureRouter(router));
            });
        }

        this.app.listen(8080, function () {
            console.log('listening on port 8080');
        })
        return this;
    }
}