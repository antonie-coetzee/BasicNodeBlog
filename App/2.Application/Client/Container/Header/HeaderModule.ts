import {injectable, ContainerModule, interfaces, multiInject} from "inversify"

import {IHeader, IHeaderKey} from "1.Framework/Client/Container/Header/IHeader"
import { Header } from "2.Application/Client/Container/Header/Header";

import { ISideBarControl, ISideBarControlKey } from "2.Application/Client/Container/Header/SideBarControl/ISideBarControl";
import { SideBarControl } from "2.Application/Client/Container/Header/SideBarControl/SideBarControl";

import { IMenuBar, IMenuBarKey } from "2.Application/Client/Container/Header/MenuBar/IMenuBar";
import { MenuBar } from "2.Application/Client/Container/Header/MenuBar/MenuBar";

export let HeaderModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
        bind<IHeader>(IHeaderKey).toConstructor(Header);
        bind<ISideBarControl>(ISideBarControlKey).toConstructor(SideBarControl);
        bind<IMenuBar>(IMenuBarKey).toConstructor(MenuBar);     
    });