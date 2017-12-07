import {injectable, ContainerModule, interfaces, multiInject} from "inversify"
import {IApiModule, IApiModuleKey} from "../../../1.Framework/Server/Api/IApiModule"
import {ControllerApi} from "./ControllerApi"

export let apiContainerModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
        bind<IApiModule>(IApiModuleKey).to(ControllerApi);
    });