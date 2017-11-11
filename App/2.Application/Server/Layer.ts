import layer from '../../1.Framework/Server/Layer'
import {Container, interfaces} from "inversify"

import {middlewareContainerModule} from "./Middleware/MiddlewareContainerModule"
import {apiContainerModule} from "./Api/ApiContainerModule"

layer.AddLayer((container)=>{
    container.load(middlewareContainerModule); 
    container.load(apiContainerModule);    
})

const iocContainer = layer.container
export {iocContainer}

export default layer;