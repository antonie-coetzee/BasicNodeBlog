import { injectable, inject } from "inversify";
import { IServerListen } from "1.Framework/Common/Server/IServerListen";
import { ILoggerKey, ILogger } from "1.Framework/Common/Services/Logging/ILogger";
import { IExpressApplication } from "1.Framework/Server/Application/IExpressApplication";

import * as expressService from "1.Framework/Client/Lib/ServiceWorker/expressService"

@injectable()
export class ServiceWorkerListen implements IServerListen {

    constructor(@inject(ILoggerKey) private logger:ILogger) {}

    Listen(app: IExpressApplication) {
        expressService(app.instance);
    }
}