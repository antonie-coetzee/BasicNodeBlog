import appContainer from 'Client/0.Bootstrap/Layer'

import {IApplication, IApplicationKey} from "Client/IApplication"
import {Application} from "./Application/Application"

import {IHeader, IHeaderKey} from "./Header/IHeader"
import {Header} from "./Header/Header"

import {ISideBar, ISideBarKey} from "./SideBar/ISideBar"
import {SideBar} from "./SideBar/SideBar"

import {ISideBarService, ISideBarServiceKey} from "./SideBar/ISideBarService"
import {SideBarService} from "./SideBar/SideBarService"

import {IContent, IContentKey} from "./Content/IContent"
import {Content} from "./Content/Content"

appContainer.AddLayer((container)=>{
    container.bind<IApplication>(IApplicationKey).toConstructor(Application);
    container.bind<IHeader>(IHeaderKey).toConstructor(Header);
    container.bind<ISideBar>(ISideBarKey).toConstructor(SideBar);
    container.bind<ISideBarService>(ISideBarServiceKey).to(SideBarService).inSingletonScope();
    container.bind<IContent>(IContentKey).toConstructor(Content);
})

export default appContainer;
