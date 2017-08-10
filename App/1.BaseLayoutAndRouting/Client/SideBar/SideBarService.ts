import {injectable} from "inversify";
import {observable} from "mobx";

import {ISideBarService} from "./ISideBarService"

@injectable()
export class SideBarService implements ISideBarService  {
    @observable
    public visible:boolean = false;

    public toggleVisible():void{
        this.visible = !this.visible;
    }
}