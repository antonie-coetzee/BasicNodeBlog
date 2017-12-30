import {IArticle} from "../../Domain/IArticle"

export interface IArticleTree {
    name:string;
    article:IArticle;
    children:IArticleTree[];
}

export let IArticleTreeServiceKey = "IArticleTreeServiceKey";

export interface IArticleTreeService {
    GetArticleTree():Promise<IArticleTree>;
    articleTree:IArticleTree;
    readonly tagCloud: Map<string,number>;
}

