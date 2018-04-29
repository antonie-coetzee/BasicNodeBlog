import { IArticle } from "../../../../Common/Domain/IArticle";

export interface IBlogService {
    readonly selectedArticle:IArticle;
    updateSelectedArticle(article:IArticle);
    
}

export let IBlogServiceKey = "IBlogServiceKey";