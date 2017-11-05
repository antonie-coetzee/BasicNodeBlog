import {IArticle} from "../../Domain/IArticle"

export interface IArticleTree {
    name:string;
    article:IArticle;
    children:IArticleTree[];
}

export interface IArticleTreeService {
    GetArticleTree():Promise<IArticleTree>
}

