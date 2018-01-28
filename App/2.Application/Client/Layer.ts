import layer from '1.Framework/Client/Layer'

import {injectable, interfaces} from "inversify";

import {IContainer, IContainerKey} from "1.Framework/Client/Container/IContainer"
import Container from '2.Application/Client/Container/Container';

import { SidebarModule } from '2.Application/Client/Container/SideBar/SideBarModule';
import { ServicesModule } from '2.Application/Client/Lib/Services/ServicesModule';

import { IFooter, IFooterKey } from '1.Framework/Client/Container/Footer/IFooter';
import { Footer } from '2.Application/Client/Container/Footer/Footer';

import {IContent, IContentKey} from "1.Framework/Client/Container/Content/IContent"
import {Content} from "./Container/Content/Content"
import BindAsync from '1.Framework/Client/Lib/Async/BindAsync';

import { IDesktopContainer, IDesktopContainerKey } from '2.Application/Client/Container/Device/IDesktopContainer';
import { DesktopContainer } from '2.Application/Client/Container/Device/DesktopContainer';
import { IMobileContainer, IMobileContainerKey } from '2.Application/Client/Container/Device/IMobileContainer';
import { MobileContainer } from '2.Application/Client/Container/Device/MobileContainer';
import { HeaderModule } from '2.Application/Client/Container/Header/HeaderModule';
import { ContentModule } from '2.Application/Client/Container/Content/ContentModule';

layer.AddLayer((container)=>{
    container.load(ServicesModule);
    container.load(HeaderModule);
    container.load(ContentModule);
    container.bind<IFooter>(IFooterKey).toConstructor(Footer);
    container.bind<IContent>(IContentKey).toConstructor(Content);
    container.bind<IContainer>(IContainerKey).toConstructor(Container);
    container.bind<IDesktopContainer>(IDesktopContainerKey).toConstructor(DesktopContainer);
    container.bind<IMobileContainer>(IMobileContainerKey).toConstructor(MobileContainer);
    container.load(SidebarModule);
/*
    // async binding and import example
    BindAsync<IContainer>(container, IContainerKey, {timeout:10000}, 
        ()=>import(/* webpackChunkName: "container" "./Container/Container").then(mod=>mod.default))

*/

})

export default layer;
