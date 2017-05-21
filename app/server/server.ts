import { injectable, inject, Container, interfaces,multiInject } from "inversify";
import "reflect-metadata";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";

import {IApiModule, IApiModuleSymbol} from "./api/IApimodule"
import {IServer, IServerSymbol} from "./IServer"

@injectable()
export class BnbServer implements IServer {
    public app: express.Application;
    private apiModules: IApiModule[];

    constructor(@inject(IApiModuleSymbol) apiModule: IApiModule) {
         this.apiModules = [apiModule];
    }
    
    bootstrap(){
        this.app = express();
        this.app.use('/', express.static(__dirname + '/../public'))

        // add API routers
        let modules = this.apiModules;
        if(modules != null){
            modules.forEach(element => {
                console.log(`server: adding api module at, ${element.basePath}`);
                let router = express.Router(element.basePath);
                this.app.use('api/', element.ConfigureRouter(router));
            });
        }

        this.app.listen(8080, function () {
            console.log('listening on port 8080');
            //contentUpdator.UpdateContent("./Content", "https://github.com/WireJunky/BlogContent.git");
        })
        return this;
    }
}