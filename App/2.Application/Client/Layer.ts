import layer from '1.Framework/Client/Layer'

import {injectable, interfaces} from "inversify";

import { IArticleTreeService , IArticleTreeServiceKey} from "../Common/Services/ArticleTree/IArticleTreeService"
import {ArticleTreeService} from "./Lib/Services/ArticleTree/ArticleTreeService"

import {IContainer, IContainerKey} from "1.Framework/Client/Container/IContainer"
import Container from '2.Application/Client/Container/Container';

import {IHeader, IHeaderKey} from "1.Framework/Client/Container/Header/IHeader"
import {Header} from "./Container/Header/Header"

import { IFooter, IFooterKey } from '1.Framework/Client/Container/Footer/IFooter';
import { Footer } from '2.Application/Client/Container/Footer/Footer';

import {IMenuBar,IMenuBarKey} from "./Container/Header/MenuBar/IMenuBar"
import {MenuBar} from "./Container/Header/MenuBar/MenuBar"

import {ISideBar, ISideBarKey} from "1.Framework/Client/Container/SideBar/ISideBar"
import {SideBar} from "./Container/SideBar/SideBar"

import {ISideBarService, ISideBarServiceKey} from "2.Application/Client/Container/SideBar/Service/ISideBarService"
import { SideBarService } from '2.Application/Client/Container/SideBar/Service/SideBarService';

import {ISideBarControl, ISideBarControlKey} from "./Container/Header/SideBarControl/ISideBarControl"
import {SideBarControl} from "./Container/Header/SideBarControl/SideBarControl"

import {IContent, IContentKey} from "1.Framework/Client/Container/Content/IContent"
import {Content} from "./Container/Content/Content"
import BindAsync from '1.Framework/Client/Lib/Async/BindAsync';

import { ApiWrapper, ApiWrapperKey } from './Lib/Api/ApiWrapper';

import { IDesktopContainer, IDesktopContainerKey } from '2.Application/Client/Container/Device/IDesktopContainer';
import { DesktopContainer } from '2.Application/Client/Container/Device/DesktopContainer';
import { IMobileContainer, IMobileContainerKey } from '2.Application/Client/Container/Device/IMobileContainer';
import { MobileContainer } from '2.Application/Client/Container/Device/MobileContainer';

layer.AddLayer((container)=>{
    container.bind<ApiWrapper>(ApiWrapperKey).to(ApiWrapper).inSingletonScope();

    container.bind<IHeader>(IHeaderKey).toConstructor(Header);
    container.bind<IFooter>(IFooterKey).toConstructor(Footer);
    container.bind<ISideBar>(ISideBarKey).toConstructor(SideBar);
    container.bind<ISideBarService>(ISideBarServiceKey).to(SideBarService).inSingletonScope();
    container.bind<IContent>(IContentKey).toConstructor(Content);
    container.bind<IMenuBar>(IMenuBarKey).toConstructor(MenuBar);
    container.bind<ISideBarControl>(ISideBarControlKey).toConstructor(SideBarControl);

    container.bind<IArticleTreeService>(IArticleTreeServiceKey).to(ArticleTreeService).inSingletonScope();

    container.bind<IContainer>(IContainerKey).toConstructor(Container);
    container.bind<IDesktopContainer>(IDesktopContainerKey).toConstructor(DesktopContainer);
    container.bind<IMobileContainer>(IMobileContainerKey).toConstructor(MobileContainer);

/*
    // async binding and import example
    BindAsync<IContainer>(container, IContainerKey, {timeout:10000}, 
        ()=>import(/* webpackChunkName: "container" "./Container/Container").then(mod=>mod.default))

*/

})

export default layer;
