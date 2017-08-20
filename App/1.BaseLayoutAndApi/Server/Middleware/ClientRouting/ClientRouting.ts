import { injectable, inject} from "inversify";
import {ILogger, ILoggerKey} from "../../../Common/Services/Logging/ILogger"
import {RequestHandler}  from "express";
import * as path from "path";
import {IMiddleware} from "../IMiddleware"

@injectable()
class ClientRoutingMiddleware implements IMiddleware {
    name:string = "client index routing";
    path:string = '/*';
    priority:number = 20;
    handlers:RequestHandler[];

    constructor(@inject(ILoggerKey) private logger:ILogger) {     
        // TODO: abstract dir
        let dir = path.resolve(__dirname + "/../../../../public");
        this.handlers = [ function(req, res){
            res.sendFile(dir + '/index.html');
        }];
    }
}

export {ClientRoutingMiddleware}