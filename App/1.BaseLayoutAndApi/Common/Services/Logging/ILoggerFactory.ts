import {ILogger} from "./ILogger"

export interface ILoggerFactory {
    Create(className:string):ILogger;
}

export const ILoggerFactoryKey = "ILoggerFactory";