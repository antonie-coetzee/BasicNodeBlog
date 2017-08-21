import {RequestHandler} from "express";

export const IMiddlewareKey = "IMiddleware";

export interface IMiddleware {
    name:string;
    path:string;
    priority:number;
    handlers:RequestHandler[];
}