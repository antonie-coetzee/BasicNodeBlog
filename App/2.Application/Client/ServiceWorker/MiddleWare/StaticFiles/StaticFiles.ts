import { injectable, inject, interfaces} from "inversify";
import * as parseUrl from "parseurl";
import {ILogger, ILoggerKey} from "1.Framework/Common/Services/Logging/ILogger";
import {RequestHandler, Request, Response, NextFunction}  from "express";
import * as express from "express";
import {IMiddleware} from "1.Framework/Server/Middleware/IMiddleware";

@injectable()
class ServiceWorkerStaticFiles implements IMiddleware {
    name:string = "express.static";
    path:string = "/";
    priority:number = 30;
    handlers:RequestHandler[];

    constructor(@inject(ILoggerKey) private logger:ILogger) {     
        this.handlers = [this.handleRequest];
    }

    async handleRequest(req:Request, resp:Response, next:NextFunction){
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            return next();
        }
      
        var originalUrl = parseUrl.original(req);
        var path = parseUrl(req).pathname;
    
        // make sure redirect occurs at mount
        if (path === '/' && originalUrl.pathname.substr(-1) !== '/') {
            path = '';
        }   
        let response = await fetch(path);
        let contentType = response.headers.get("content-type");
        resp.contentType(contentType);
        if(contentType.includes("text")){
            let text = await response.text();          
            return resp.send(text);  
        }
        if(contentType.includes("image")){
            let buffer = await response.arrayBuffer();
            resp.setHeader("Content-Length", buffer.byteLength.toString());
            return resp.end(buffer, 'binary');  
        } 
        if(contentType.includes("application")){
            let text = await response.text();
            return resp.send(text);  
        }   
        return next();
    }
}

export {ServiceWorkerStaticFiles}