import {injectable, inject} from "inversify";
import * as winston from "winston"

import {ILoggerConfig} from "../../Common/Services/Logging/ILoggerConfig"

@injectable()
export class ServerLoggerConfig implements ILoggerConfig {
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