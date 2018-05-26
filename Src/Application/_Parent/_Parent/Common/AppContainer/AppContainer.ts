import "reflect-metadata"

import {IAppContainer} from "./IAppContainer"
import {Container, interfaces} from "inversify"

export default class AppContainer implements IAppContainer {
    public container:Container;
    
    private currentContainer:Container;
    
    constructor() {
        this.container = new Container({ skipBaseClassChecks: true });
        this.currentContainer = new Container({ skipBaseClassChecks: true });
    }

    public AddLayer(builder: (container:interfaces.Container)=>void) : void {
        if(builder == null){
            throw new Error("argument 'builder' is null");
        }
        let childContainer = new Container({ skipBaseClassChecks: true });
        childContainer.parent = this.currentContainer;
        this.currentContainer = childContainer;
        builder(childContainer);
    }
    
    public Initialize() : void {
        this.container.parent = this.currentContainer;
    }
}