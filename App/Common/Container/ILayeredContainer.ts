import {interfaces} from "inversify"

// abstracts the construction of a layered container
export interface ILayeredContainer {
    readonly container:interfaces.Container;
    AddLayer(builder: (childContainer:interfaces.Container)=>void) : void
}