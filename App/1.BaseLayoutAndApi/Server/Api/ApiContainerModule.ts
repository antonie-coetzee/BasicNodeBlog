
import {injectable, ContainerModule, interfaces, multiInject} from "inversify"
import {IApiModule, IApiModuleKey} from "./IApiModule"

import {IContentUpdator, IContentUpdatorKey} from "./Content/IContentUpdator"
import ContentUpdator from "./Content/ContentUpdator"
import {ContentApi} from "./Content/ContentApi"

export let apiContainerModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
        bind<IContentUpdator>(IContentUpdatorKey).to(ContentUpdator);
        bind<IApiModule>(IApiModuleKey).to(ContentApi);
    });