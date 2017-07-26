import {interfaces} from "inversify"

// abstracts the construction of a layered container
export interface IAppContainer {
    readonly container:interfaces.Container;
    Add(builder: (childContainer:interfaces.Container)=>void) : void
}