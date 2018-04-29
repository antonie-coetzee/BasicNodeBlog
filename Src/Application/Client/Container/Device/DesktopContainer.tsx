import * as React from "react";
import { withRouter } from "react-router";
import {interfaces, injectable} from "inversify";
import * as classNames from "classnames";
import { lazyInject } from "../../../_Parent/_Parent/Common/AppContainer/LazyInject";

import {IContainer} from "../../../_Parent/Client/Container/IContainer"
import {IHeader, IHeaderKey} from "../../../_Parent/Client/Container/Header/IHeader"
import { IFooterKey, IFooter } from "../../../_Parent/Client/Container/Footer/IFooter";
import {ISideBar, ISideBarKey} from "../../../_Parent/Client/Container/SideBar/ISideBar"
import {IContent, IContentKey} from "../../../_Parent/Client/Container/Content/IContent"
import {ILoggerKey, ILogger} from "../../../_Parent/Common/Services/Logging/ILogger"

import { IDesktopContainer } from "../../../Client/Container/Device/IDesktopContainer";

import style from "Theme/Style.less"


@withRouter
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
        return <div  className={classNames('style.container')} style={{height:4000}}>  
                    <this.Header MenubarVisible={true}/>    
                    <this.Footer/> 
                </div> 
    } 
}

/* <div className={classNames(style.card, style.desktopSidebar)}>                                   
                                        <this.SideBar/>                                                                                                                                                                                              
                                    </div>    
                                    
                        <div className={classNames(style.column, style.isThreeQuarters)}>
                            <this.Content/>                                      
                        </div>    
                        

                                    
                                    */