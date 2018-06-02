import {IExpressApplication, IExpressApplicationKey} from "./IExpressApplication"

import {injectable} from "inversify";
import express from "express";

@injectable()
export class ExpressApplication implements IExpressApplication {
    public instance: express.Application;

    constructor() {
        this.instance = express();
    }   
}