import * as React from "react";
import {interfaces, injectable} from "inversify";
import * as classNames from "classnames";

import {IContainer} from "1.Framework/Client/Container/IContainer"
import {IHeader, IHeaderKey} from "1.Framework/Client/Container/Header/IHeader"
import { IFooterKey, IFooter } from "1.Framework/Client/Container/Footer/IFooter";
import {ISideBar, ISideBarKey} from "1.Framework/Client/Container/SideBar/ISideBar"
import {IContent, IContentKey} from "1.Framework/Client/Container/Content/IContent"
import {ILoggerKey, ILogger} from "1.Framework/Common/Services/Logging/ILogger"

import { IDesktopContainer } from "2.Application/Client/Container/Device/IDesktopContainer";

import style from "Style.sass"


@injectable()
export class DesktopContainer extends React.Component implements IDesktopContainer {

    @lazyInject(IHeaderKey)
    public Header : interfaces.Newable<IHeader>;

    @lazyInject(IFooterKey)
    public Footer : interfaces.Newable<IFooter>;

    @lazyInject(ISideBarKey)
    public SideBar : interfaces.Newable<ISideBar>;

    @lazyInject(IContentKey)
    public Content : interfaces.Newable<IContent>;

    @lazyInject(ILoggerKey)
    public logger:ILogger

    render() {
        return <div className={classNames(style.container)}>  
                    <this.Header MenubarVisible={true}/> 
                    <div className={classNames(style.sectionAllEqual)}>          
                        <div className={classNames(style.columns)}>
                            <div className={classNames(style.column, style.isOneQuarter)}>
                                <this.SideBar/>
                            </div>
                            <div className={classNames(style.column, style.isThreeQuarters)}>
                                <this.Content/>                                      
                            </div>
                        </div>
                    </div>    
                    <this.Footer/> 
                </div> 
    } 
}