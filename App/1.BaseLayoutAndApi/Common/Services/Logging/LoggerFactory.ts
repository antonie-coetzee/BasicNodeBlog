import {injectable, inject} from "inversify";
import * as winston from "winston"

import {ILoggerConfig, ILoggerConfigKey} from "./ILoggerConfig"
import {ILogger} from "./ILogger"
import {Logger} from "./Logger"
import {ILoggerFactory} from "./ILoggerFactory"

@injectable()
export class LoggerFactory implements ILoggerFactory {
    private readonly categoryId:string = 'app'

    constructor(@inject(ILoggerConfigKey) private config:ILoggerConfig) {
        winston.loggers.add(this.categoryId, config.options);
    }

    Create(className:string):ILogger{
        return new Logger(winston.loggers.get(this.categoryId), className);
    }
}