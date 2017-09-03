import layer from '../../1.Framework/Client/Layer'

import {IContainer, IContainerKey} from "../../1.Framework/Client/Container/IContainer"
import {Container} from "./Container/Container"

import {IHeader, IHeaderKey} from "../../1.Framework/Client/Container/Header/IHeader"
import {Header} from "./Container/Header/Header"

import {IMenuBar,IMenuBarKey} from "./Container/Header/MenuBar/IMenuBar"
import {MenuBar} from "./Container/Header/MenuBar/MenuBar"

import {ISideBar, ISideBarKey} from "../../1.Framework/Client/Container/SideBar/ISideBar"
import {SideBar} from "./Container/SideBar/SideBar"

import {ISideBarService, ISideBarServiceKey} from "./Container/SideBar/ISideBarService"
import {SideBarService} from "./Container/SideBar/SideBarService"

import {IContent, IContentKey} from "../../1.Framework/Client/Container/Content/IContent"
import {Content} from "./Container/Content/Content"

layer.AddLayer((container)=>{
    container.bind<IHeader>(IHeaderKey).toConstructor(Header);
    container.bind<ISideBar>(ISideBarKey).toConstructor(SideBar);
    container.bind<ISideBarService>(ISideBarServiceKey).to(SideBarService).inSingletonScope();
    container.bind<IContent>(IContentKey).toConstructor(Content);
    container.bind<IContainer>(IContainerKey).toConstructor(Container);
    container.bind<IMenuBar>(IMenuBarKey).toConstructor(MenuBar);
})

export default layer;
