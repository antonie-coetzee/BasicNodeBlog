import * as React from "react";
import {autorun, IReactionDisposer} from "mobx";
import {interfaces} from "inversify";
import * as slideOut from "slideout"
import * as classNames from "classnames";

import {IContainer} from "../../../1.Framework/Client/Container/IContainer"
import {IContainerProps} from "./ContainerProps"
import {IHeader, IHeaderKey} from "../../../1.Framework/Client/Container/Header/IHeader"
import {ISideBar, ISideBarKey} from "../../../1.Framework/Client/Container/SideBar/ISideBar"
import {ISideBarService, ISideBarServiceKey} from "./SideBar/ISideBarService"
import {IResponsiveService, IResponsiveServiceKey} from "../../../1.Framework/Client/Lib/Responsive/IResponsiveService"
import {IContent, IContentKey} from "../../../1.Framework/Client/Container/Content/IContent"
import {ILoggerKey, ILogger} from "../../../1.Framework/Common/Services/Logging/ILogger"

import style from "Style.sass"

export class ContainerMobile extends React.Component<IContainerProps, any> {

    private menuRef : HTMLDivElement;
    private panelRef : HTMLDivElement;
    private slideOut : slideOut;
    private slideAutorunDisposer: IReactionDisposer;

    public Header : interfaces.Newable<IHeader>;
    public SideBar : interfaces.Newable<ISideBar>;
    public Content : interfaces.Newable<IContent>;
    public logger : ILogger

    @lazyInject(ISideBarServiceKey)
    public SideBarService : ISideBarService;

    @lazyInject(IResponsiveServiceKey)
    public ResponsiveService : IResponsiveService;

    constructor(props:IContainerProps) {
        super(props);
        this.Header = props.Header;
        this.SideBar = props.SideBar;
        this.Content = props.Content;
        this.logger = props.Logger;
    }

    public componentDidMount(){
        if(this.ResponsiveService.IsMobile){
            this.slideOut = new slideOut(
                {
                    panel:this.panelRef, 
                    menu: this.menuRef,
                    padding: 256                       
                });
        }
        if(this.ResponsiveService.IsTablet){
            this.slideOut = new slideOut(
                {
                    panel:this.panelRef, 
                    menu: this.menuRef,
                    padding: 350
                });
        }
        // publish open/close events
        this.slideOut.on("open", ()=>{this.SideBarService.currentVisible = true;})
        this.slideOut.on("close", ()=>{this.SideBarService.currentVisible = false;})
        // subscribe to open/close events
        this.slideAutorunDisposer = autorun(()=>{
            if(this.SideBarService.visible){
                this.slideOut.open();
            }else{
                this.slideOut.close();
            }
        });               
    }

    public componentWillUnmount(){
        this.slideOut.destroy();
        this.slideAutorunDisposer();
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