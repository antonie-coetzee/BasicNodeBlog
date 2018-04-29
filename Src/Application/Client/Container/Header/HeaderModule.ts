import {injectable, ContainerModule, interfaces, multiInject} from "inversify"
import BindRouteProps from "../../../_Parent/Client/Lib/Route/BindRouteProps";

import {IHeader, IHeaderKey} from "../../../_Parent/Client/Container/Header/IHeader"
import { Header } from "../../../Client/Container/Header/Header";

import { ISideBarControl, ISideBarControlKey } from "../../../Client/Container/Header/SideBarControl/ISideBarControl";
import { SideBarControl } from "../../../Client/Container/Header/SideBarControl/SideBarControl";

import { IMenuBar, IMenuBarKey } from "../../../Client/Container/Header/MenuBar/IMenuBar";
import { MenuBar } from "../../../Client/Container/Header/MenuBar/MenuBar";

import { ITitle, ITitleKey, ITitleRouteProps, ITitleRoutePropsKey } from "../../../Client/Container/Header/Title/ITitle";

import { IDefaultTitle, IDefaultTitleKey } from "../../../Client/Container/Header/Title/Default/IDefaultTitle";
import { DefaultTitle } from "../../../Client/Container/Header/Title/Default/DefaultTitle";


export let HeaderModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
        bind<IHeader>(IHeaderKey).toConstructor(Header);
        bind<ISideBarControl>(ISideBarControlKey).toConstructor(SideBarControl);
        bind<IMenuBar>(IMenuBarKey).toConstructor(MenuBar);   

        bind<IDefaultTitle>(IDefaultTitleKey).toConstructor(DefaultTitle);
        BindRouteProps<ITitleRouteProps, IDefaultTitle>(
            bind, 
            IDefaultTitleKey, 
            ITitleRoutePropsKey,
            {path:'/blog/*', priority:0});   
    });