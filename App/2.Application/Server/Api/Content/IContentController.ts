import { IArticle } from "2.Application/Common/Domain/IArticle";
import { IArticleTree } from "2.Application/Common/Services/ArticleTree/IArticleTreeService";

export const IContentControllerKey = "IContentControllerKey";

export interface IContentController {
    doUpdate():Promise<any>;
}