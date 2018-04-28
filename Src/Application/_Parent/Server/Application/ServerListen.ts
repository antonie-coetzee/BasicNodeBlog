import { injectable, inject } from "inversify";
import { IServerListen } from "../../Common/Server/IServerListen";
import { IExpressApplication } from "../../Server/Application/IExpressApplication";
import { ILoggerKey, ILogger } from "../../Common/Services/Logging/ILogger";

@injectable()
export class ServerListen implements IServerListen {

    constructor(@inject(ILoggerKey) private logger:ILogger) {}

    Listen(app: IExpressApplication) {
        app.instance.listen(8080, ()=> {
            this.logger.Info("listening on port: %s", "8080");
        })
    }
}