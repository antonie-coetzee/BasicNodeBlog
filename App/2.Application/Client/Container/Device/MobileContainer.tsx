import * as React from "react";
import { withRouter } from "react-router";
import {autorun, IReactionDisposer, action} from "mobx";
import {interfaces, injectable} from "inversify";
import * as slideOut from "slideout"
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

import style from "Style.sass"


@withRouter
@injectable()
export class MobileContainer extends React.Component implements IMobileContainer {

    private menuRef : HTMLDivElement;
    private panelRef : HTMLDivElement;
    private slideOut : slideOut;
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

    public componentDidMount(){

        // publish open/close events

        // subscribe to open/close events
        
        autorun(()=>{
            if(this.ResponsiveService.IsMobile && this.panelRef && this.menuRef){
                if(this.slideOut){
                    this.slideOut.destroy();
                }
                this.slideOut = new slideOut(
                    {
                        panel:this.panelRef, 
                        menu: this.menuRef,
                        padding: 256                       
                    });           
            }
            if(this.ResponsiveService.IsTablet && this.panelRef && this.menuRef){
                if(this.slideOut){
                    this.slideOut.destroy();
                }
                this.slideOut = new slideOut(
                    {
                        panel:this.panelRef, 
                        menu: this.menuRef,
                        padding: 350
                    });            
            }
            this.slideOut.on("open", action(()=>{this.SideBarService.currentVisible = true;}))
            this.slideOut.on("close", action(()=>{this.SideBarService.currentVisible = false;}))        
        });
               
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