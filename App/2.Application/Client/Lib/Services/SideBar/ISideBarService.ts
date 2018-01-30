import { IArticleTree } from "2.Application/Common/Services/Article/IArticleService";

export interface ISideBarService{
    visible:boolean;
    currentVisible:boolean;
    ToggleVisible() : void;
}

export let ISideBarServiceKey = "ISideBarService";