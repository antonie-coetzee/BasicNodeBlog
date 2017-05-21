import {Router} from "express";

export let IApiModuleSymbol = Symbol("IApiModule");

export interface IApiModule {
    readonly basePath:string;
    ConfigureRouter(router:Router) : Router;
}