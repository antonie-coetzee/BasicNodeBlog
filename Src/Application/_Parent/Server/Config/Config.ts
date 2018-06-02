import { injectable} from "inversify";
import {IConfig} from "./IConfig"
import * as path from "path"
import * as fs from "fs"

import config from "Server.Config.json"

@injectable()
export default class Config implements IConfig {
    contentUrl: string;
    contentLocalPath:string;

    constructor() {
        this.contentLocalPath = this.get(["content", "localPath"], config) || "../Public/Content";
        this.contentUrl = this.get(["content", "contentUrl"], config) || "https://github.com/WireJunky/BlogContent";
    }

    get(p:string[], o:any):any{
        return p.reduce((xs, x) =>
                    (xs && xs[x]) ? xs[x] : null, o)
    }
} 