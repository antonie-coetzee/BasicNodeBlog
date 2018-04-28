import layer from '../_Parent/Server/Layer'

import {Container, interfaces} from "inversify"

import {middlewareContainerModule} from "./Middleware/MiddlewareContainerModule"
import {apiContainerModule} from "./Api/ApiContainerModule"

import { IArticleService, IArticleServiceKey } from "../Common/Services/Article/IArticleService"
import { IContentService, IContentServiceKey } from './Lib/Services/Content/IContent';

import { ArticleService } from './Lib/Services/Article/ArticleService';
import { ContentService } from './Lib/Services/Content/Content';

layer.AddLayer((container)=>{
    container.load(middlewareContainerModule); 
    container.load(apiContainerModule);
    container.bind<IArticleService>(IArticleServiceKey).to(ArticleService)
    container.bind<IContentService>(IContentServiceKey).to(ContentService)
})

export default layer; 