import {injectable} from "inversify";
import {observable, action} from "mobx";

import {ISideBarService} from "./ISideBarService"
import { IArticleTree } from "2.Application/Common/Services/ArticleTree/IArticleTreeService";

@injectable()
export class SideBarService implements ISideBarService  {
    
    @observable
    public visible:boolean = false;

    @observable
    public currentVisible:boolean = false;

    constructor() {

    }

    @action 
    public ToggleVisible():void{
        this.visible = !this.visible;
    }

}