export interface IServer {
    bootstrap() : IServer
}

export let IServerSymbol = Symbol("IServer");