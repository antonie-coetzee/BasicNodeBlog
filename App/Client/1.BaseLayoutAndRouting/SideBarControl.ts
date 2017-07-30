import {injectable} from "inversify";
import {observable} from "mobx";

import {ISideBarControl} from "Client/Contracts/Layout/ISideBarControl"

@injectable()
export class SideBarControl implements ISideBarControl  {
    @observable
    public visible:boolean = false;

    constructor() {
        this.visible = false;
    }

    public toggleVisible():void{
        this.visible = !this.visible;
    }
}