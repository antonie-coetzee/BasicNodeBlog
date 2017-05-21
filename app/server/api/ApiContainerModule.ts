
import {injectable, ContainerModule, interfaces, multiInject} from "inversify"
import {IApiModule, IApiModuleSymbol} from "./IApiModule"

import {ContentApi} from "./Content/ContentApi"

export let apiContainerModule = new ContainerModule(
    (bind: interfaces.Bind)=>{
        bind<IApiModule>(IApiModuleSymbol).to(ContentApi);
    });