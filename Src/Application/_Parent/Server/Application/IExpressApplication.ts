import * as express from "express";

export interface IExpressApplication {
    instance:express.Application;
}

export const IExpressApplicationKey = "IExpressApplication";