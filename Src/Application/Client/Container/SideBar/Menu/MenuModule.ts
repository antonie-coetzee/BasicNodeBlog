import {injectable, ContainerModule, interfaces, multiInject} from "inversify"
import BindRouteProps from "../../../../_Parent/Client/Lib/Route/BindRouteProps";

import { IMenuRouteProps, IMenuRoutePropsKey } from "../../../../Client/Container/SideBar/Menu/IMenu";

import { IBlogMenuKey, IBlogMenu } from "../../../../Client/Container/SideBar/Menu/BlogMenu/IBlogMenu";
import { BlogMenu } from "../../../../Client/Container/SideBar/Menu/BlogMenu/BlogMenu";

export let MenuModule = new ContainerModule(
    (bind: interfaces.Bind)=>{  
        bind<IBlogMenu>(IBlogMenuKey).toConstructor(BlogMenu);
        
        BindRouteProps<IMenuRouteProps, IBlogMenu>(
            bind, 
            IBlogMenuKey, 
            IMenuRoutePropsKey,
            {path:'/blog/*', priority:0});     
    });