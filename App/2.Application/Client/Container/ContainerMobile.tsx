import * as React from "react";
import {interfaces} from "inversify";
import * as slideOut from "slideout"
import * as classNames from "classnames";

import {IContainer} from "../../../1.Framework/Client/Container/IContainer"
import {IContainerProps} from "./ContainerProps"
import {IHeader, IHeaderKey} from "../../../1.Framework/Client/Container/Header/IHeader"
import {ISideBar, ISideBarKey} from "../../../1.Framework/Client/Container/SideBar/ISideBar"
import {IContent, IContentKey} from "../../../1.Framework/Client/Container/Content/IContent"
import {ILoggerKey, ILogger} from "../../../1.Framework/Common/Services/Logging/ILogger"

import style from "Style.sass"

export class ContainerMobile extends React.PureComponent<IContainerProps, any> {

    private menuRef : HTMLDivElement;
    private panelRef : HTMLDivElement;
    private slideOut : slideOut;

    public Header : interfaces.Newable<IHeader>;
    public SideBar : interfaces.Newable<ISideBar>;
    public Content : interfaces.Newable<IContent>;
    public logger : ILogger

    constructor(props:IContainerProps) {
        super(props);
        this.Header = props.Header;
        this.SideBar = props.SideBar;
        this.Content = props.Content;
        this.logger = props.Logger;
        this.logger.Info("desktop component.. constructor")
    }

    public componentDidMount(){
        this.slideOut = new slideOut({panel:this.panelRef, menu: this.menuRef, padding: 256});
    }

    public componentWillUnmount(){
        this.slideOut.destroy();
    }

    render() {
            return <div>          
                        <div id="menu" ref={(menuDiv) => { this.menuRef = menuDiv; }} className={classNames(style.section)}>               
                            <this.SideBar/>
                        </div>
                        <div id="panel" ref={(panelDiv) => { this.panelRef = panelDiv; }} >                          
                            <this.Header/>          
                            <div className={classNames(style.sectionAllEqual)}>                                  
                                <this.Content/>
                            </div>
                        </div>
                    </div>
    } 
}