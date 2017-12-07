import layer from '../../1.Framework/Server/Layer'
import {Container, interfaces} from "inversify"

import {middlewareContainerModule} from "./Middleware/MiddlewareContainerModule"
import {apiContainerModule} from "./Api/ApiContainerModule"

import {UsersController} from "./Api/Controllers/AboutController"

layer.AddLayer((container)=>{
    container.load(middlewareContainerModule); 
    container.load(apiContainerModule);

    container.bind<UsersController>(UsersController).to(UsersController);    
})

export default layer;