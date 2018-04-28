import { IArticle } from "2.Application/Common/Domain/IArticle";

export interface IBlogService {
    readonly selectedArticle:IArticle;
    updateSelectedArticle(article:IArticle);
    
}

export let IBlogServiceKey = "IBlogServiceKey";