
import {injectable} from "inversify"
import {IRoute} from "express";

import {IApi} from "./IApi"

@injectable()
export class BnbApi implements IApi{
    get routes() : IRoute[]{
        return null;
    }
}