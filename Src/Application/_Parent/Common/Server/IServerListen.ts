import { IExpressApplication } from "../../Server/Application/IExpressApplication";

export interface IServerListen {
    Listen(app:IExpressApplication)
}

export const IServerListenKey = "IServerListenKey";