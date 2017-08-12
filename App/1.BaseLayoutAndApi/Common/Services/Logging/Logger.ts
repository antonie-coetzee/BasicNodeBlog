import {injectable} from "inversify";
import {ILogger} from "./ILogger"

@injectable()
export class Logger implements ILogger {

    constructor(private logger:(level:string, message:string, meta:any)=>void, private preFix:string) {
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
    
    Debug(message:string, meta?:any):void{
        this.log('debug', message, meta);
    }

    private log(level:string, message:string, meta?:any):void{
        this.logger(level, `${this.preFix}: ${message}`, meta);
    }
}