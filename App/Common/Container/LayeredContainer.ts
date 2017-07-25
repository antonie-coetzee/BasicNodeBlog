import "reflect-metadata"

import {ILayeredContainer} from "./ILayeredContainer"
import {Container, interfaces} from "inversify"

export default class LayeredContainer implements ILayeredContainer {
    public container:Container;

    public AddLayer(builder: (childContainer:interfaces.Container)=>void) : void {
        if(builder == null){
            throw new Error("argument 'builder' is null");
        }
        let parent = this.container;
        let child = new Container();
        child.parent = parent;
        this.container = child;
        builder(child);
    }
}