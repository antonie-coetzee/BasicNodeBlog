import { IExpressApplication } from "1.Framework/Server/Application/IExpressApplication";

export interface IServerListen {
    Listen(app:IExpressApplication)
}

export const IServerListenKey = "IServerListenKey";