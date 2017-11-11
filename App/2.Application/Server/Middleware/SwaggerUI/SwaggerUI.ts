import { injectable, inject, interfaces} from "inversify";
import {ILogger, ILoggerKey} from "../../../../1.Framework/Common/Services/Logging/ILogger"
import {RequestHandler}  from "express";
import * as express from "express";
import {IMiddleware} from "../../../../1.Framework/Server/Middleware/IMiddleware"

import * as ui from "swagger-ui-express"
import * as swaggerDocument from "./swagger.json"

@injectable()
class SwaggerUIMiddleware implements IMiddleware {
    name:string = "swagger-ui-express";
    path:string = "/api-docs";
    priority:number = 15;
    handlers:RequestHandler[];

    constructor(@inject(ILoggerKey) private logger:ILogger) {    
        let router = express.Router();
        router.get("/swagger.json", function (req,resp){
            resp.setHeader('Content-Type', 'application/json');
            resp.send(JSON.stringify(swaggerDocument));
        });
        this.handlers = [router, ui.serve, ui.setup(swaggerDocument, false)];
    }
}

export {SwaggerUIMiddleware}