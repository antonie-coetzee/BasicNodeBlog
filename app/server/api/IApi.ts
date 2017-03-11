import {IRoute} from "express";

export interface IApi {
    routes : IRoute[]
}

export let IApiSymbol = Symbol("IApi");