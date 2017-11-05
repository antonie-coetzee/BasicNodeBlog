import {injectable, ContainerModule, interfaces, multiInject} from "inversify"
import {IApiModule, IApiModuleKey} from "../../../1.Framework/Server/Api/IApiModule"
import {ContentApi} from "./Content/ContentApi"

export let apiContainerModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
        bind<IApiModule>(IApiModuleKey).to(ContentApi);
    });