import "reflect-metadata"
import {Container, interfaces} from "inversify"

import  {IApi, IApiSymbol} from "./api/IApi"
import  {BnbApi} from "./api/Api"

import  {IServer,IServerSymbol} from "./IServer"
import  {BnbServer} from "./Server"

import {IContentUpdator, IContentUpdatorSymbol} from "./IContentUpdator"
import {ContentUpdator} from "./ContentUpdator"

export class BnbContainerBuilder {
    public build() : Container{
        let bnbContainer = new Container();
        bnbContainer.bind<IApi>(IApiSymbol).to(BnbApi);
        bnbContainer.bind<IServer>(IServerSymbol).to(BnbServer);
        bnbContainer.bind<IContentUpdator>(IContentUpdatorSymbol).to(ContentUpdator);
        return bnbContainer;
    }
}