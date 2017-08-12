import {ILogger} from "./ILogger"

export interface ILoggerFactory {
    Create(preFix:string):ILogger;
}

export const ILoggerFactoryKey = "ILoggerFactory";