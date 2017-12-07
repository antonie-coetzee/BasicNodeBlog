import "./Controllers/AboutController"

import { injectable, inject} from "inversify";
import {Router} from "express";
import {IApiModule} from "../../../1.Framework/Server/Api/IApiModule"
import {ILogger, ILoggerKey} from "../../../1.Framework/Common/Services/Logging/ILogger"
import {RegisterRoutes} from "./routes"

@injectable()
export class ControllerApi implements IApiModule {
    basePath:string = '/';

    constructor() {}
  
    ConfigureRouter(router:Router) : Router{
        RegisterRoutes(router, null);
        return router; 
    }
}