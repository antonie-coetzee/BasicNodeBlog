import { injectable, inject } from "inversify";
import { ILogger, ILoggerKey } from "1.Framework/Common/Services/Logging/ILogger"
import { RequestHandler } from "express";
import * as fs from "fs";
import * as url from "url"
import * as path from "path";
import { IMiddleware } from "1.Framework/Server/Middleware/IMiddleware"

@injectable()
class ClientRoutingMiddleware implements IMiddleware {
    name: string = "client index routing";
    path: string = '/';
    priority: number = 30;
    handlers: RequestHandler[];

    constructor( @inject(ILoggerKey) private logger: ILogger) {
        // TODO: abstract dir
        let dir = path.resolve(__dirname + "/../../../../../public");
        this.handlers = [function (req, res, next) {
            let parsedUrl = url.parse(req.url);
            if (parsedUrl.path.indexOf('/api/') >= 0) {
                next(); //ignore api endpoint
            } else if (parsedUrl.path.indexOf('__webpack_hmr') >= 0) {
                next(); //ignore webpack hmr endpoint                
            } else if (parsedUrl.path.indexOf('.') < 0 && req.method == 'GET') {
                req.url = '/index.html';
                next();
            } else if(parsedUrl.path.indexOf('assets') >= 0 && req.method == 'GET') {
                let fileSegment = parsedUrl.path.substring(parsedUrl.path.lastIndexOf('/'));
                req.url = '/assets' + fileSegment;
                next();    
            }
            else if(parsedUrl.path.indexOf('font') >= 0 && req.method == 'GET') {
                let fileSegment = parsedUrl.path.substring(parsedUrl.path.lastIndexOf('/'));
                req.url = '/font' + fileSegment;
                next();   
            }
            else if(req.method == 'GET') {
                let fileSegment = parsedUrl.path.substring(parsedUrl.path.lastIndexOf('/'));
                req.url = fileSegment;
                next();                           
            } else {
                next();
            }
        }];
    }
}

export { ClientRoutingMiddleware }