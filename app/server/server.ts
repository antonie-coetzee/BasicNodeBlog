import { injectable, inject, Container, interfaces } from "inversify";
import "reflect-metadata";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";

import {IServer, IServerSymbol} from "./IServer"
import {IApi, IApiSymbol} from "./api/IApi"

@injectable()
export class BnbServer implements IServer {
    public app: express.Application;

    constructor(
         @inject(IApiSymbol) private api: IApi
    ) {}

    bootstrap(){
        this.app = express();

        this.app.use('/', express.static(__dirname + '/../public'))

        this.app.listen(8080, function () {
            console.log('Example app listening on port 8080') 
        })

        return this;
    }
}