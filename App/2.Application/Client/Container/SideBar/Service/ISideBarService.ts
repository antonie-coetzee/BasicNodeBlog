import { IArticleTree } from "2.Application/Common/Services/ArticleTree/IArticleTreeService";

export interface ISideBarService{
    visible:boolean;
    currentVisible:boolean;
    ToggleVisible() : void;
    articleTree:IArticleTree;
}

export let ISideBarServiceKey = "ISideBarService";