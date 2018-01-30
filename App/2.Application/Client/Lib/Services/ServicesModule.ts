import {injectable, ContainerModule, interfaces, multiInject} from "inversify"

import { ApiWrapper, ApiWrapperKey } from "2.Application/Client/Lib/Api/ApiWrapper";

import {ISideBarService, ISideBarServiceKey} from "2.Application/Client/Lib/Services/SideBar/ISideBarService"
import { SideBarService } from '2.Application/Client/Lib/Services/SideBar/SideBarService';

import { IArticleService, IArticleServiceKey } from "2.Application/Common/Services/Article/IArticleService";
import { ArticleService } from "2.Application/Client/Lib/Services/Article/ArticleService";

import { IBlogService, IBlogServiceKey } from "2.Application/Client/Lib/Services/Blog/IBlogService";
import { BlogService } from "2.Application/Client/Lib/Services/Blog/BlogService";

export let ServicesModule = new ContainerModule(
    (bind: interfaces.Bind)=>{      
        bind<ApiWrapper>(ApiWrapperKey).to(ApiWrapper).inSingletonScope(); 
        bind<ISideBarService>(ISideBarServiceKey).to(SideBarService).inSingletonScope();  
        bind<IArticleService>(IArticleServiceKey).to(ArticleService).inSingletonScope();
        bind<IBlogService>(IBlogServiceKey).to(BlogService).inSingletonScope(); 
    });