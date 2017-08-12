import {injectable, inject} from "inversify";
import * as winston from "winston"

import {ILoggerConfig, ILoggerConfigKey} from "./ILoggerConfig"
import {ILogger} from "../../../Common/Services/Logging/ILogger"
import {Logger} from "../../../Common/Services/Logging/Logger"
import {ILoggerFactory} from "../../../Common/Services/Logging/ILoggerFactory"

@injectable()
export class LoggerFactory implements ILoggerFactory {
    private readonly categoryId:string = 'app'

    constructor(@inject(ILoggerConfigKey) private config:ILoggerConfig) {
        winston.loggers.add(this.categoryId, config.options);
    }

    Create(preFix:string):ILogger{
        let logger = winston.loggers.get(this.categoryId);
        return new Logger((level,message,meta)=>{logger.log(level,message, meta);}, preFix);
    }
}