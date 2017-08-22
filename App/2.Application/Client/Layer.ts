import layer from '../../1.Framework/Client/Layer'

import {IHeader, IHeaderKey} from "../../1.Framework/Client/Header/IHeader"
import {Header} from "./Header/Header"

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
})

export default layer;
