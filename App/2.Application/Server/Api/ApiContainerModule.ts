import {injectable, ContainerModule, interfaces, multiInject} from "inversify"
import {IApiModule, IApiModuleKey} from "1.Framework/Server/Api/IApiModule"
import {ControllerApi} from "./ControllerApi"

import { IArticleController, IArticleControllerKey } from '2.Application/Server/Api/Article/IArticleController';
import { IContentController, IContentControllerKey } from "2.Application/Server/Api/Content/IContentController";
/// #if !ServiceWorker
import { ArticleController } from '2.Application/Server/Api/Article/ArticleController';
import { ContentController } from "2.Application/Server/Api/Content/ContentController";
/// #endif

export let apiContainerModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
        bind<IApiModule>(IApiModuleKey).to(ControllerApi);
/// #if !ServiceWorker
        bind<IArticleController>(IArticleControllerKey).to(ArticleController);
        bind<IContentController>(IContentControllerKey).to(ContentController);   
/// #endif             
    });