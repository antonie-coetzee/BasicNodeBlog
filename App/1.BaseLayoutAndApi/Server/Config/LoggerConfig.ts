import {injectable, inject} from "inversify";
import * as winston from "winston"

import {ILoggerConfig} from "../Lib/Logging/ILoggerConfig"

@injectable()
export class LoggerConfig implements ILoggerConfig {
    public options:winston.LoggerOptions

    constructor() {
        this.options = {            
            transports:
            [
                new winston.transports.Console(
                    {
                        level: 'silly',
                        colorize: true
                    })
            ]
        };
    }
}