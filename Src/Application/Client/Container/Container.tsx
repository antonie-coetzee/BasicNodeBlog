import * as React from "react";
import {observer} from "mobx-react"
import {injectable, interfaces} from "inversify";
import * as classNames from "classnames";
import * as slideOut from "slideout"

import { lazyInject } from "../../_Parent/_Parent/Common/AppContainer/LazyInject";

import {IContainer} from "../../_Parent/Client/Container/IContainer"
import {IResponsiveService, IResponsiveServiceKey} from "../../_Parent/Client/Lib/Responsive/IResponsiveService"
import {IHeader, IHeaderKey} from "../../_Parent/Client/Container/Header/IHeader"
import {ISideBar, ISideBarKey} from "../../_Parent/Client/Container/SideBar/ISideBar"
import {IContent, IContentKey} from "../../_Parent/Client/Container/Content/IContent"
import {ILoggerKey, ILogger} from "../../_Parent/Common/Services/Logging/ILogger"

import { IDesktopContainerKey, IDesktopContainer } from "../../Client/Container/Device/IDesktopContainer";
import { IMobileContainerKey, IMobileContainer } from "../../Client/Container/Device/IMobileContainer";
import { withRouter } from "react-router";

import style from "Theme/Style.less"

//@observer
@injectable()
export class Container extends React.Component<any, any> implements IContainer  {

    @lazyInject(IResponsiveServiceKey)
    public ResponsiveService : IResponsiveService;

    @lazyInject(IDesktopContainerKey)
    public DesktopContainer : interfaces.Newable<IDesktopContainer>;

    @lazyInject(IMobileContainerKey)
    public MobileContainer : interfaces.Newable<IMobileContainer>;    

    render() {
        return <div>    
                    {(this.ResponsiveService.IsTablet || this.ResponsiveService.IsMobile) &&
                        <this.MobileContainer />
                    }
                    {this.ResponsiveService.IsDesktop &&
                        <this.DesktopContainer />
                    }                
                </div> 
    } 
}