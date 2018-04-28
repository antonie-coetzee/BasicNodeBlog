import {injectable, ContainerModule, interfaces, multiInject} from "inversify"
import BindRouteProps from "1.Framework/Client/Lib/Route/BindRouteProps";

import { IMenuRouteProps, IMenuRoutePropsKey } from "2.Application/Client/Container/SideBar/Menu/IMenu";

import { IBlogMenuKey, IBlogMenu } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/IBlogMenu";
import { BlogMenu } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/BlogMenu";

export let MenuModule = new ContainerModule(
    (bind: interfaces.Bind)=>{  
        bind<IBlogMenu>(IBlogMenuKey).toConstructor(BlogMenu);
        
        BindRouteProps<IMenuRouteProps, IBlogMenu>(
            bind, 
            IBlogMenuKey, 
            IMenuRoutePropsKey,
            {path:'/blog/*', priority:0});     
    });