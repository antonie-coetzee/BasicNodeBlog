import { injectable} from "inversify";
import {IConfig} from "./IConfig"

import * as fs from "fs"

@injectable()
export default class Config implements IConfig {
    contentUrl:string;

    constructor() {
        var config = JSON.parse(fs.readFileSync('./app/server/config.json', 'utf8'));
        this.contentUrl = config.contentUrl;
    }
} 