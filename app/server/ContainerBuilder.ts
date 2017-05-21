import "reflect-metadata"
import {Container, interfaces} from "inversify"

import  {IServer,IServerKey} from "./IServer"
import  {BnbServer} from "./Server"

import {apiContainerModule} from "./api/ApiContainerModule"

export class BnbContainerBuilder {
    public build() : Container{
        let bnbContainer = new Container();
        bnbContainer.load(apiContainerModule);
        bnbContainer.bind<IServer>(IServerKey).to(BnbServer);    
        return bnbContainer;
    }
}