import {injectable, inject} from "inversify";
import * as loglevel from "loglevel"

import {ILogger} from "../../../Common/Services/Logging/ILogger"
import {Logger} from "../../../Common/Services/Logging/Logger"
import {ILoggerFactory} from "../../../Common/Services/Logging/ILoggerFactory"

@injectable()
export class LoggerFactory implements ILoggerFactory {
    constructor() {
    }

    Create(preFix:string):ILogger{
        let logLevel = loglevel.getLevel();
        //loglevel.enableAll();
        let logger = loglevel.getLogger(preFix);
        let log = (level:string, message:string, meta?:any)=>{
            if(!meta){
                meta = "";
            }
            switch(level){
                case "error":{
                    logger.error(message, meta);
                    break;
                }
                case "warn":{
                    logger.warn(message, meta);
                    break;
                }
                case "info":{
                    logger.info(message, meta);
                    break;
                }                  
                case "debug":{
                    logger.debug(message, meta);
                    break;
                }                   
                default: { 
                    logger.error(`loglevel: ${level}, not supported`);
                    break;                 
                }   
            }
        }
        return new Logger(log, preFix);
    }
}