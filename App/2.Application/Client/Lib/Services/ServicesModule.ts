import {injectable, ContainerModule, interfaces, multiInject} from "inversify"

import { ApiWrapper, ApiWrapperKey } from "2.Application/Client/Lib/Api/ApiWrapper";

import {ISideBarService, ISideBarServiceKey} from "2.Application/Client/Lib/Services/SideBar/ISideBarService"
import { SideBarService } from '2.Application/Client/Lib/Services/SideBar/SideBarService';

import { IArticleTreeService, IArticleTreeServiceKey } from "2.Application/Common/Services/ArticleTree/IArticleTreeService";
import { ArticleTreeService } from "2.Application/Client/Lib/Services/ArticleTree/ArticleTreeService";

export let ServicesModule = new ContainerModule(
    (bind: interfaces.Bind)=>{      
        bind<ApiWrapper>(ApiWrapperKey).to(ApiWrapper).inSingletonScope(); 
        bind<ISideBarService>(ISideBarServiceKey).to(SideBarService).inSingletonScope();  
        bind<IArticleTreeService>(IArticleTreeServiceKey).to(ArticleTreeService).inSingletonScope();    
    });