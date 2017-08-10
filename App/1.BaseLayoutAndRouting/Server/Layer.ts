import appContainer from '../../0.Bootstrap/Server/Layer'
import {Container, interfaces} from "inversify"

import {IConfig, IConfigKey} from "./config/IConfig"
import Config from "./config/Config"
import  {IServerApplication,IServerApplicationKey} from "../../0.Bootstrap/Common/Application/IServerApplication"
import  {ServerApplication} from "./Application/ServerApplication"

import {apiContainerModule} from "./api/ApiContainerModule"

appContainer.AddLayer((container)=>{
    container.bind<IConfig>(IConfigKey).to(Config);
    container.bind<IServerApplication>(IServerApplicationKey).to(ServerApplication);
    container.load(apiContainerModule);    
})

export default appContainer;