import * as winston from "winston"

export interface ILoggerConfig {
    options:winston.LoggerOptions
}

export const ILoggerConfigKey = "ILoggerConfig";