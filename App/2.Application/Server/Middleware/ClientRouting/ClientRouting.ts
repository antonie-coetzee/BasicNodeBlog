import { injectable, inject} from "inversify";
import {ILogger, ILoggerKey} from "../../../../1.Framework/Common/Services/Logging/ILogger"
import {RequestHandler}  from "express";
import * as path from "path";
import {IMiddleware} from "../../../../1.Framework/Server/Middleware/IMiddleware"

@injectable()
class ClientRoutingMiddleware implements IMiddleware {
    name:string = "client index routing";
    path:string = '/*';
    priority:number = 20;
    handlers:RequestHandler[];

    constructor(@inject(ILoggerKey) private logger:ILogger) {     
        // TODO: abstract dir
        let dir = path.resolve(__dirname + "/../../../../public");
        this.handlers = [ function(req, res, next){
            var pathname = req.baseUrl;
            if (pathname.indexOf('/api/') >= 0){
                next(); //ignore api endpoint
            }else{
                res.sendFile(dir + '/index.html');
            }          
        }];
    }
}

export {ClientRoutingMiddleware}