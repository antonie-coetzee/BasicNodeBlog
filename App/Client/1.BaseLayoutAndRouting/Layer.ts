import appContainer from 'client/0.Bootstrap/Layer'

import {IApplication, IApplicationKey} from "Client/Contracts/Layout/IApplication"
import {Application} from "./Application"

import {IHeader, IHeaderKey} from "Client/Contracts/Layout/IHeader"
import {Header} from "./Header"

import {ISideBar, ISideBarKey} from "Client/Contracts/Layout/ISideBar"
import {SideBar} from "./SideBar"

import {ISideBarControl, ISideBarControlKey} from "Client/Contracts/Layout/ISideBarControl"
import {SideBarControl} from "./SideBarControl"

import {IContent, IContentKey} from "Client/Contracts/Layout/IContent"
import {Content} from "./Content"

appContainer.AddLayer((container)=>{
    container.bind<IApplication>(IApplicationKey).toConstructor(Application);
    container.bind<IHeader>(IHeaderKey).toConstructor(Header);
    container.bind<ISideBar>(ISideBarKey).toConstructor(SideBar);
    container.bind<ISideBarControl>(ISideBarControlKey).to(SideBarControl).inSingletonScope();
    container.bind<IContent>(IContentKey).toConstructor(Content);
})

export default appContainer;
