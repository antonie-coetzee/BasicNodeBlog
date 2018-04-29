import { IArticle } from "../../../Common/Domain/IArticle";
import { IArticleTree } from "../../../Common/Services/Article/IArticleService";

export const IArticleControllerKey = "IArticleControllerKey";

export interface IArticleController {
    getTree(): Promise<IArticleTree>
    getArticleWithSource(shortId:string):Promise<IArticle>
}