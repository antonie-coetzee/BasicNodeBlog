import layer from '../../1.Framework/Server/Layer'
import {Container, interfaces} from "inversify"

import {middlewareContainerModule} from "./Middleware/MiddlewareContainerModule"
import {apiContainerModule} from "./Api/ApiContainerModule"

import { IArticleTreeService, IArticleTreeServiceKey } from "../Common/Services/ArticleTree/IArticleTreeService"
import { ArticleTreeService } from './Lib/Services/ArticleTree/ArticleTreeService';

layer.AddLayer((container)=>{
    container.load(middlewareContainerModule); 
    container.load(apiContainerModule);

    container.bind<IArticleTreeService>(IArticleTreeServiceKey).to(ArticleTreeService)
})

export default layer;