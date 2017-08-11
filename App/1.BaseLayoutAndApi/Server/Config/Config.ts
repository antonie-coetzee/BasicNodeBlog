import { injectable} from "inversify";
import {IConfig} from "./IConfig"
import * as path from "path"

import * as fs from "fs"

@injectable()
export default class Config implements IConfig {
    contentUrl:string;

    constructor() {
         let configPath = path.resolve(__dirname, '../../../Server.Config.json')
         var config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
         this.contentUrl = config.contentUrl;
    }
} 