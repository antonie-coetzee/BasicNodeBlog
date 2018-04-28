import {interfaces} from "inversify"

// abstracts the construction of a layered container
export interface IAppContainer {
    readonly container:interfaces.Container;
    AddLayer(builder: (childContainer:interfaces.Container)=>void) : void
    Initialize():void
}