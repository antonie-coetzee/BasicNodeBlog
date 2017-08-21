import {injectable, ContainerModule, interfaces, multiInject} from "inversify"
import {IApiModule, IApiModuleKey} from "../../../1.Framework/Server/Api/IApiModule"

import {IContentRepository, IContentRepositoryKey} from "../Lib/Content/Repository/IContentRepository"
import ContentRepository from "../Lib/Content/Repository/ContentRepository"
import {ContentApi} from "./Content/ContentApi"

export let apiContainerModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
        bind<IContentRepository>(IContentRepositoryKey).to(ContentRepository);
        bind<IApiModule>(IApiModuleKey).to(ContentApi);
    });