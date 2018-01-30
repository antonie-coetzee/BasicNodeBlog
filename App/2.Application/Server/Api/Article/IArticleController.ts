import { IArticle } from "2.Application/Common/Domain/IArticle";
import { IArticleTree } from "2.Application/Common/Services/Article/IArticleService";

export const IArticleControllerKey = "IArticleControllerKey";

export interface IArticleController {
    getTree(): Promise<IArticleTree>
    getArticleWithSource(shortId:string):Promise<IArticle>
}