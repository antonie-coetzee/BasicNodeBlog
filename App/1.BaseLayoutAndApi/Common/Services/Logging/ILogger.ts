export interface ILogger {
    Error(message:string, meta?:any):void;
    Warn(message:string, meta?:any):void;
    Info(message:string, meta?:any):void;
    Verbose(message:string, meta?:any):void;
    Debug(message:string, meta?:any):void;
}

export const ILoggerKey = "ILogger";