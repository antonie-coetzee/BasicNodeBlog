import {Router} from "express";

export const IApiModuleKey = "IApiModule";

export interface IApiModule {
    basePath:string;
    ConfigureRouter(router:Router) : Router;
}