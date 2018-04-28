import {IArticle} from "../../Domain/IArticle"

export interface IArticleTree {
    name:string;
    article:IArticle;
    children:IArticleTree[];
}

export let IArticleServiceKey = "IArticleServiceKey";

export interface IArticleService {
    GetArticleTree():Promise<IArticleTree>;
    readonly articleTree:IArticleTree;
    getArticleWithSource(id:string):Promise<IArticle>;
    readonly articleWithSource:IArticle;
    readonly tagCloud: Map<string,number>;
}

