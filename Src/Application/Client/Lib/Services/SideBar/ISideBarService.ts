import { IArticleTree } from "../../../../Common/Services/Article/IArticleService";

export interface ISideBarService{
    visible:boolean;
    currentVisible:boolean;
    ToggleVisible() : void;
}

export let ISideBarServiceKey = "ISideBarService";