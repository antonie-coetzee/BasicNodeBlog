import { injectable} from "inversify";
import {IConfig} from "./IConfig"
import * as path from "path"

import * as fs from "fs"

@injectable()
export default class Config implements IConfig {
    contentUrl:string;

    constructor() {
         console.log(`cwd: ${__dirname}`)
         let configPath = path.resolve(__dirname, '../../../Server.Config.json')
         console.log(`config path: ${configPath}`)
         var config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
         this.contentUrl = config.contentUrl;
    }
} 