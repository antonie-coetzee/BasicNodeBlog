import "./Controllers/AboutController"

import { decorate, injectable, inject, Container, interfaces} from "inversify";
import {Router} from "express";
import {IApiModule} from "../../../1.Framework/Server/Api/IApiModule"
import {ILogger, ILoggerKey} from "../../../1.Framework/Common/Services/Logging/ILogger"
import {RegisterRoutes} from "./routes"
import { Controller } from "tsoa";

@injectable()
export class ControllerApi implements IApiModule {
    basePath:string = '/';

    constructor(@inject(Container) private container:interfaces.Container,) {}
  
    ConfigureRouter(router:Router) : Router{
        decorate(injectable(), Controller) // fix inheritance
        RegisterRoutes(router, this.container);
        return router; 
    }
}