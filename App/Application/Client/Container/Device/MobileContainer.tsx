import * as React from "react";
import { withRouter } from "react-router";
import {autorun, IReactionDisposer, action} from "mobx";
import { observer } from "mobx-react";
import {interfaces, injectable} from "inversify";
import { push as Menu } from 'react-burger-menu'
import * as classNames from "classnames";
import { lazyInject } from "0.Bootstrap/Common/AppContainer/LazyInject";

import {IContainer} from "1.Framework/Client/Container/IContainer"
import {IHeader, IHeaderKey} from "1.Framework/Client/Container/Header/IHeader"
import {ISideBar, ISideBarKey} from "1.Framework/Client/Container/SideBar/ISideBar"
import { ISideBarServiceKey, ISideBarService } from "2.Application/Client/Lib/Services/SideBar/ISideBarService";
import {IResponsiveService, IResponsiveServiceKey} from "1.Framework/Client/Lib/Responsive/IResponsiveService"
import {IContent, IContentKey} from "1.Framework/Client/Container/Content/IContent"
import {ILoggerKey, ILogger} from "1.Framework/Common/Services/Logging/ILogger"

import { IMobileContainer } from "2.Application/Client/Container/Device/IMobileContainer";

import style from "Style.less"

@withRouter
@observer
@injectable()
export class MobileContainer extends React.Component implements IMobileContainer {

    private menuRef : HTMLDivElement;
    private panelRef : HTMLDivElement;
    private slideAutorunDisposer: IReactionDisposer;

    @lazyInject(IHeaderKey)
    public Header : interfaces.Newable<IHeader>;

    @lazyInject(ISideBarKey)
    public SideBar : interfaces.Newable<ISideBar>;

    @lazyInject(IContentKey)
    public Content : interfaces.Newable<IContent>;

    @lazyInject(ILoggerKey)
    public logger:ILogger

    @lazyInject(ISideBarServiceKey)
    public SideBarService : ISideBarService;

    @lazyInject(IResponsiveServiceKey)
    public ResponsiveService : IResponsiveService;

    @action 
    public IsMenuOpen(state:{isOpen:boolean}){
        this.SideBarService.currentVisible = state.isOpen;
    }

    render() {
            var sidebarContent = <this.SideBar/>;
            var sideBarStyle = style.mobileSidebar
            return  <div id="outer-container">
                        <Menu   pageWrapId={ "page-wrap" } 
                                outerContainerId={ "outer-container" }
                                customBurgerIcon={ false }
                                isOpen={ this.SideBarService.visible }
                                onStateChange={ (state)=>this.IsMenuOpen(state) }
                                noOverlay>
                            <this.SideBar styles={sideBarStyle}/>
                        </Menu>
                        <div id="page-wrap" >                     
                            <this.Header/>          
                            <div className={classNames(style.sectionAllEqual)}>                                  
                                <this.Content/>
                            </div>
                        </div>               
                    </div>                                               
    } 
}

/* <div id="menu" ref={(menuDiv) => { this.menuRef = menuDiv; }} className={classNames(style.section)}>               
<this.SideBar/>
</div> 
                            <div id="panel" ref={(panelDiv) => { this.panelRef = panelDiv; }} >                     
                                <this.Header/>          
                                <div className={classNames(style.sectionAllEqual)}>                                  
                                    <this.Content/>
                                </div>
                            </div>  

*/