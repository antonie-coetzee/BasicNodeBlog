import * as React from "react";
import {observer} from "mobx-react"
import {injectable, interfaces} from "inversify";
import * as classNames from "classnames";
import * as slideOut from "slideout"
import * as MediaQuery from "react-responsive"

import {IContainer} from "../../../1.Framework/Client/Container/IContainer"
import {IResponsiveService, IResponsiveServiceKey} from "../../../1.Framework/Client/Lib/Responsive/IResponsiveService"
import {IHeader, IHeaderKey} from "../../../1.Framework/Client/Container/Header/IHeader"
import {ISideBar, ISideBarKey} from "../../../1.Framework/Client/Container/SideBar/ISideBar"
import {IContent, IContentKey} from "../../../1.Framework/Client/Container/Content/IContent"

import {ILoggerKey, ILogger} from "../../../1.Framework/Common/Services/Logging/ILogger"

import {ContainerDesktop} from "./ContainerDesktop"
import {ContainerMobile} from "./ContainerMobile"

import style from "Style.sass"

@observer
@injectable()
export class Container extends React.Component<any, any> implements IContainer  {

    @lazyInject(IResponsiveServiceKey)
    public ResponsiveService : IResponsiveService;

    @lazyInject(IHeaderKey)
    public Header : interfaces.Newable<IHeader>;

    @lazyInject(ISideBarKey)
    public SideBar : interfaces.Newable<ISideBar>;

    @lazyInject(IContentKey)
    public Content : interfaces.Newable<IContent>;

    @lazyInject(ILoggerKey)
    public logger:ILogger

    constructor() {
        super();
        this.logger.Info("some info from the container component")
    }

    render() {
        return <div>    
                    {(this.ResponsiveService.IsTablet || this.ResponsiveService.IsMobile) &&
                        <ContainerMobile 
                            Content={this.Content} 
                            Header={this.Header}
                            Logger={this.logger}
                            SideBar={this.SideBar}>
                        </ContainerMobile>
                    }
                    {this.ResponsiveService.IsDesktop &&
                        <ContainerDesktop
                            Content={this.Content} 
                            Header={this.Header}
                            Logger={this.logger}
                            SideBar={this.SideBar}>
                        </ContainerDesktop>
                    }                
                </div> 
    } 
}