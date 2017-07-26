import "reflect-metadata"

import {IAppContainer} from "./IAppContainer"
import {Container, interfaces} from "inversify"

export default class AppContainer implements IAppContainer {
    public container:Container;

    constructor() {
        this.container = new Container();
    }

    public Add(builder: (container:interfaces.Container)=>void) : void {
        if(builder == null){
            throw new Error("argument 'builder' is null");
        }
        builder(this.container);
    }
}