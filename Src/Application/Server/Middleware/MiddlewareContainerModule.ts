import {injectable, ContainerModule, interfaces} from "inversify"
import {IMiddlewareKey, IMiddleware} from "../../_Parent/Server/Middleware/IMiddleware"
import {StaticFilesMiddleware} from "./StaticFiles/StaticFiles"
import {ClientRoutingMiddleware} from "./ClientRouting/ClientRouting"
import {SwaggerUIMiddleware} from "./SwaggerUI/SwaggerUI"
import { WebpackDevMiddleware } from "./Webpack/Webpack";

export let middlewareContainerModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
        if(process.env.NODE_ENV === "development"){
            bind<IMiddleware>(IMiddlewareKey).to(ClientRoutingMiddleware);
            bind<IMiddleware>(IMiddlewareKey).to(WebpackDevMiddleware);          
        }else{
            bind<IMiddleware>(IMiddlewareKey).to(ClientRoutingMiddleware);
            bind<IMiddleware>(IMiddlewareKey).to(StaticFilesMiddleware);
        }
        bind<IMiddleware>(IMiddlewareKey).to(SwaggerUIMiddleware);

    });