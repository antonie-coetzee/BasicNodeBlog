import {injectable, ContainerModule, interfaces, multiInject} from "inversify"

import { IBlogWrapper, IBlogWrapperKey } from "2.Application/Client/Container/Content/Blog/IBlogWrapper";
import { BlogWrapper } from "2.Application/Client/Container/Content/Blog/BlogWrapper";

export let ContentModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
        bind<IBlogWrapper>(IBlogWrapperKey).toConstructor(BlogWrapper);      
    });