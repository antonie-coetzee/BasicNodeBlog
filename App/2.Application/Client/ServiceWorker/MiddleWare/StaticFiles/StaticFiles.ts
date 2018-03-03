import { injectable, inject, interfaces} from "inversify";
import * as parseUrl from "parseurl";
import {ILogger, ILoggerKey} from "1.Framework/Common/Services/Logging/ILogger";
import {RequestHandler, Response as expressResponse, Request, NextFunction}  from "express";
import * as express from "express";
import {IMiddleware} from "1.Framework/Server/Middleware/IMiddleware";
import { IClientCacheKey, IClientCache } from "../../ClientCache/IClientCache";

interface RequestWithInfo extends Request {
    requestInfo:RequestInfo;
}


@injectable()
class ServiceWorkerStaticFiles implements IMiddleware {
    name:string = "express.static";
    path:string = "/";
    priority:number = 30;
    handlers:RequestHandler[];

    constructor(@inject(ILoggerKey) private logger:ILogger, @inject(IClientCacheKey) private clientCache:IClientCache) {     
        this.handleRequest = this.handleRequest.bind(this);
        
        this.handlers = [this.handleRequest];
    }

    async handleRequest(req:RequestWithInfo, resp:expressResponse, next:NextFunction){
        if (req.method !== 'GET' && req.method !== 'HEAD') {
            return next();
        }
   
        var originalUrl = parseUrl.original(req);
        var path = parseUrl(req).pathname;
    
        // make sure redirect occurs at mount
        if (path === '/' && originalUrl.pathname.substr(-1) !== '/') {
            path = '';
        }   

        let response:Response = null;

        let cache = await this.clientCache.Instance;
        let cachedResponse = await cache.match(req.requestInfo);
        if(cachedResponse){
            response = cachedResponse.clone();
        }else{
            response = await fetch(req.requestInfo);
            if(response.ok){
                await cache.put(req.requestInfo, response.clone());
            }      
        }
        
        let contentType = response.headers.get("content-type");
        resp.contentType(contentType);
        resp.statusCode = response.status;
        resp.statusMessage = response.statusText;
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