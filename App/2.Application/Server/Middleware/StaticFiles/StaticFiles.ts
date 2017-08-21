import { injectable, inject, interfaces} from "inversify";
import {ILogger, ILoggerKey} from "../../../../1.Framework/Common/Services/Logging/ILogger"
import {RequestHandler}  from "express";
import * as express from "express";
import * as path from "path";
import {IMiddleware} from "../../../../1.Framework/Server/Middleware/IMiddleware"

@injectable()
class StaticFilesMiddleware implements IMiddleware {
    name:string = "express.static";
    path:string = "/";
    priority:number = 10;
    handlers:RequestHandler[];

    constructor(@inject(ILoggerKey) private logger:ILogger) {     
        let dir = path.resolve(__dirname + "/../../../../public");
        this.logger.Debug(`serving static files from: ${dir}`);
        let handler = express.static(dir);
        this.handlers = [handler];
    }
}

export {StaticFilesMiddleware}