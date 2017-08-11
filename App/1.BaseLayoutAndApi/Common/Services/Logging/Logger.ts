import {injectable} from "inversify";
import {ILogger} from "./ILogger"

import * as winston from "winston"

@injectable()
export class Logger implements ILogger {

    constructor(private logger:winston.LoggerInstance, private className:string) {
    }
    
    Error(message:string, meta?:any):void{
        this.log('error', message, meta);
    }

    Warn(message:string, meta?:any):void{
        this.log('warn', message, meta);
    }

    Info(message:string, meta?:any):void{
        this.log('info', message, meta);
    }

    Verbose(message:string, meta?:any):void{
        this.log('verbose', message, meta);
    }
    
    Debug(message:string, meta?:any):void{
        this.log('debug', message, meta);
    }

    private log(level:string, message:string, meta?:any):void{
        this.logger.log(level, `${this.className}: ${message}`, meta);
    }
}