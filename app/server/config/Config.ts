import { injectable} from "inversify";
import {IConfig} from "./IConfig"

import * as fs from "fs"

@injectable()
export default class Config implements IConfig {
    contentUrl:string;

    constructor() {
        // var config = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
        // this.contentUrl = config.contentUrl;
        this.contentUrl = '';
    }
} 