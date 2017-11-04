import * as React from "react";
import {interfaces} from "inversify";
import * as classNames from "classnames";

import {IContainer} from "../../../1.Framework/Client/Container/IContainer"
import {IContainerProps} from "./ContainerProps"
import {IHeader, IHeaderKey} from "../../../1.Framework/Client/Container/Header/IHeader"
import {ISideBar, ISideBarKey} from "../../../1.Framework/Client/Container/SideBar/ISideBar"
import {IContent, IContentKey} from "../../../1.Framework/Client/Container/Content/IContent"
import {ILoggerKey, ILogger} from "../../../1.Framework/Common/Services/Logging/ILogger"

import style from "Style.sass"

export class ContainerDesktop extends React.Component<IContainerProps, any> {

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
    }

    render() {
        return <div className={classNames(style.container)}>    
                    <this.Header MenubarVisible={true}/>
                    <div className={classNames(style.sectionAllEqual)}>          
                        <div className={classNames(style.columns)}>
                            <div className={classNames(style.column, style.is3)}>
                                <this.SideBar/>
                            </div>
                            <div className={style.column}>
                                <this.Content/>
                            </div>
                        </div>
                    </div>            
                </div> 
    } 
}