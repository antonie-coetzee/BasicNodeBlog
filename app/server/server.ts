import { injectable, inject, Container, interfaces } from "inversify";
import "reflect-metadata";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";

import {IServer, IServerSymbol} from "./IServer"
import {IApi, IApiSymbol} from "./api/IApi"
import {IContentUpdator, IContentUpdatorSymbol} from "./IContentUpdator"

@injectable()
export class BnbServer implements IServer {
    public app: express.Application;

    constructor(
         @inject(IApiSymbol) private api: IApi,
         @inject(IContentUpdatorSymbol) private contentUpdator: IContentUpdator
    ) {}

    bootstrap(){
        this.app = express();
        var contentUpdator = this.contentUpdator;
        this.app.use('/', express.static(__dirname + '/../public'))
        this.app.listen(8080, function () {
            console.log('listening on port 8080');
            contentUpdator.UpdateContent("./Content", "https://github.com/WireJunky/BlogContent.git");
        })
        return this;
    }
}