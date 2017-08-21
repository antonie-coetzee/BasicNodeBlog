import {ContainerModule, interfaces} from "inversify"

import {ILogger, ILoggerKey} from "./ILogger"
import {ILoggerFactory, ILoggerFactoryKey} from "./ILoggerFactory"

export const loggingModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
        bind<ILogger>(ILoggerKey).toDynamicValue(
            (context)=>{
                let factory = context.container.get<ILoggerFactory>(ILoggerFactoryKey);
                let binding = context.plan.rootRequest.serviceIdentifier;
                return factory.Create(binding.toString());
            }).inSingletonScope();
    });