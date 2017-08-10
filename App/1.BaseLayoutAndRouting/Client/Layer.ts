import layer from '../../0.Bootstrap/Client/Layer'

import {IClientApplication, IClientApplicationKey} from "../../0.Bootstrap/Common/Application/IClientApplication"
import {ClientApplication} from "./Application/ClientApplication"

import {IHeader, IHeaderKey} from "./Header/IHeader"
import {Header} from "./Header/Header"

import {ISideBar, ISideBarKey} from "./SideBar/ISideBar"
import {SideBar} from "./SideBar/SideBar"

import {ISideBarService, ISideBarServiceKey} from "./SideBar/ISideBarService"
import {SideBarService} from "./SideBar/SideBarService"

import {IContent, IContentKey} from "./Content/IContent"
import {Content} from "./Content/Content"

layer.AddLayer((container)=>{
    container.bind<IClientApplication>(IClientApplicationKey).toConstructor(ClientApplication);
    container.bind<IHeader>(IHeaderKey).toConstructor(Header);
    container.bind<ISideBar>(ISideBarKey).toConstructor(SideBar);
    container.bind<ISideBarService>(ISideBarServiceKey).to(SideBarService).inSingletonScope();
    container.bind<IContent>(IContentKey).toConstructor(Content);
})

export default layer;
