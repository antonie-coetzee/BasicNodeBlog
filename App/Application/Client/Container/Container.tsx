import * as React from "react";
import {observer} from "mobx-react"
import {injectable, interfaces} from "inversify";
import * as classNames from "classnames";
import * as slideOut from "slideout"

import { lazyInject } from "0.Bootstrap/Common/AppContainer/LazyInject";

import {IContainer} from "1.Framework/Client/Container/IContainer"
import {IResponsiveService, IResponsiveServiceKey} from "1.Framework/Client/Lib/Responsive/IResponsiveService"
import {IHeader, IHeaderKey} from "1.Framework/Client/Container/Header/IHeader"
import {ISideBar, ISideBarKey} from "1.Framework/Client/Container/SideBar/ISideBar"
import {IContent, IContentKey} from "1.Framework/Client/Container/Content/IContent"
import {ILoggerKey, ILogger} from "1.Framework/Common/Services/Logging/ILogger"

import { IDesktopContainerKey, IDesktopContainer } from "2.Application/Client/Container/Device/IDesktopContainer";
import { IMobileContainerKey, IMobileContainer } from "2.Application/Client/Container/Device/IMobileContainer";
import { withRouter } from "react-router";

import style from "Style.less"

@withRouter
@observer
@injectable()
export default class Container extends React.Component<any, any> implements IContainer  {

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