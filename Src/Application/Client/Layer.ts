import layer from '../_Parent/Client/Layer'

import { ContentModule } from './Container/Content/ContentModule';
import { HeaderModule } from './Container/Header/HeaderModule';
import { SidebarModule } from './Container/SideBar/SideBarModule';

import { IContainer, IContainerKey } from '../_Parent/Client/Container/IContainer';
import { Container } from './Container/Container';
import { IDesktopContainer, IDesktopContainerKey } from './Container/Device/IDesktopContainer';
import { DesktopContainer } from './Container/Device/DesktopContainer';
import { IMobileContainer, IMobileContainerKey } from './Container/Device/IMobileContainer';
import { MobileContainer } from './Container/Device/MobileContainer';
import { IFooter, IFooterKey } from '../_Parent/Client/Container/Footer/IFooter';
import { Footer } from './Container/Footer/Footer';
import { ServicesModule } from './Lib/Services/ServicesModule';
import { MenuModule } from './Container/SideBar/Menu/MenuModule';

layer.AddLayer((container)=>{
    container.load(ServicesModule);
    container.load(ContentModule); 
    container.load(HeaderModule); 
    container.load(SidebarModule); 
    container.load(MenuModule);

    container.bind<IContainer>(IContainerKey).toConstructor(Container)
    container.bind<IDesktopContainer>(IDesktopContainerKey).toConstructor(DesktopContainer)
    container.bind<IMobileContainer>(IMobileContainerKey).toConstructor(MobileContainer)
    container.bind<IFooter>(IFooterKey).toConstructor(Footer)
})

export default layer;
