import "reflect-metadata"
import {Container, interfaces} from "inversify"

import {IConfig, IConfigKey} from "./config/IConfig"
import Config from "./config/Config"
import  {IServer,IServerKey} from "./IServer"
import  {Server} from "./Server"

import {apiContainerModule} from "./api/ApiContainerModule"

export class ContainerBuilder {
    public build() : Container{
        let container = new Container();
        container.bind<IConfig>(IConfigKey).to(Config)
        container.bind<IServer>(IServerKey).to(Server);
        container.load(apiContainerModule);    
        return container;
    }
}