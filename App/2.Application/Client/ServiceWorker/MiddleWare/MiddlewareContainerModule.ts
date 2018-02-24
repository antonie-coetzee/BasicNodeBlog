import {injectable, ContainerModule, interfaces} from "inversify"
import { IMiddleware, IMiddlewareKey } from "1.Framework/Server/Middleware/IMiddleware";

import {ServiceWorkerStaticFiles} from "./StaticFiles/StaticFiles"

export let MiddlewareContainerModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
        bind<IMiddleware>(IMiddlewareKey).to(ServiceWorkerStaticFiles);
    });