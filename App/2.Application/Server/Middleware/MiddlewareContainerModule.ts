import {injectable, ContainerModule, interfaces} from "inversify"
import {IMiddlewareKey, IMiddleware} from "../../../1.Framework/Server/Middleware/IMiddleware"

/// #if !ServiceWorker
import {StaticFilesMiddleware} from "./StaticFiles/StaticFiles"
import {ClientRoutingMiddleware} from "./ClientRouting/ClientRouting"
import {SwaggerUIMiddleware} from "./SwaggerUI/SwaggerUI"
import { WebpackDevMiddleware } from "./Webpack/Webpack";
/// #endif

export let middlewareContainerModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
/// #if !ServiceWorker
        if(process.env.dev){
            bind<IMiddleware>(IMiddlewareKey).to(WebpackDevMiddleware);
            bind<IMiddleware>(IMiddlewareKey).to(ClientRoutingMiddleware);
        }else{
            bind<IMiddleware>(IMiddlewareKey).to(StaticFilesMiddleware);
        }
        bind<IMiddleware>(IMiddlewareKey).to(SwaggerUIMiddleware);
/// #endif
    });