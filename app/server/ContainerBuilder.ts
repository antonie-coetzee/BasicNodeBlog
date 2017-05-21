import "reflect-metadata"
import {Container, interfaces} from "inversify"

import  {IServer,IServerSymbol} from "./IServer"
import  {BnbServer} from "./Server"

import {apiContainerModule} from "./api/ApiContainerModule"

import {IApiModule, IApiModuleSymbol} from "./api/IApiModule"
import {ContentApi} from "./api/Content/ContentApi"

export class BnbContainerBuilder {
    public build() : Container{
        let bnbContainer = new Container();
        //bnbContainer.load(apiContainerModule);
        bnbContainer.bind<IApiModule>(IApiModuleSymbol).to(ContentApi);
        bnbContainer.bind<IServer>(IServerSymbol).to(BnbServer);    
        return bnbContainer;
    }
}