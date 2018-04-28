import {injectable, ContainerModule, interfaces, multiInject} from "inversify"
import {IApiModule, IApiModuleKey} from "../../_Parent/Server/Api/IApiModule"
import {ControllerApi} from "./ControllerApi"

import { IArticleController, IArticleControllerKey } from '../../Server/Api/Article/IArticleController';
import { IContentController, IContentControllerKey } from "../../Server/Api/Content/IContentController";
import { ArticleController } from '../../Server/Api/Article/ArticleController';
import { ContentController } from "../../Server/Api/Content/ContentController";

export let apiContainerModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
        bind<IApiModule>(IApiModuleKey).to(ControllerApi);
        bind<IArticleController>(IArticleControllerKey).to(ArticleController);
        bind<IContentController>(IContentControllerKey).to(ContentController);            
    });