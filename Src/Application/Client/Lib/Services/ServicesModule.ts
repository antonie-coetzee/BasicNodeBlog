import {injectable, ContainerModule, interfaces, multiInject} from "inversify"

import { ApiWrapper, ApiWrapperKey } from "../../../Client/Lib/Api/ApiWrapper";

import {ISideBarService, ISideBarServiceKey} from "../../../Client/Lib/Services/SideBar/ISideBarService"
import { SideBarService } from '../../../Client/Lib/Services/SideBar/SideBarService';

import { IArticleService, IArticleServiceKey } from "../../../Common/Services/Article/IArticleService";
import { ArticleService } from "../../../Client/Lib/Services/Article/ArticleService";

import { IBlogService, IBlogServiceKey } from "../../../Client/Lib/Services/Blog/IBlogService";
import { BlogService } from "../../../Client/Lib/Services/Blog/BlogService";

export let ServicesModule = new ContainerModule(
    (bind: interfaces.Bind)=>{      
        bind<ApiWrapper>(ApiWrapperKey).to(ApiWrapper).inSingletonScope(); 
        bind<ISideBarService>(ISideBarServiceKey).to(SideBarService).inSingletonScope();  
        bind<IArticleService>(IArticleServiceKey).to(ArticleService).inSingletonScope();
        bind<IBlogService>(IBlogServiceKey).to(BlogService).inSingletonScope(); 
    });