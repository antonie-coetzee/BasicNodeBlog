export interface ISideBarService{
    visible:boolean;
    currentVisible:boolean;
    ToggleVisible() : void;
}

export let ISideBarServiceKey = "ISideBarService";