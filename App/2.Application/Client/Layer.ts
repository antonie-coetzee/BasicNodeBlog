import layer from '../../1.Framework/Client/Layer'

import {IHeader, IHeaderKey} from "../../1.Framework/Client/Header/IHeader"
import {Header} from "./Header/Header"

import {ISideBar, ISideBarKey} from "../../1.Framework/Client/SideBar/ISideBar"
import {SideBar} from "./SideBar/SideBar"

import {ISideBarService, ISideBarServiceKey} from "./SideBar/ISideBarService"
import {SideBarService} from "./SideBar/SideBarService"

import {IContent, IContentKey} from "../../1.Framework/Client/Content/IContent"
import {Content} from "./Content/Content"

layer.AddLayer((container)=>{
    container.bind<IHeader>(IHeaderKey).toConstructor(Header);
    container.bind<ISideBar>(ISideBarKey).toConstructor(SideBar);
    container.bind<ISideBarService>(ISideBarServiceKey).to(SideBarService).inSingletonScope();
    container.bind<IContent>(IContentKey).toConstructor(Content);
})

export default layer;
