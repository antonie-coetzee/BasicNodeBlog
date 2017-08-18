import {injectable, interfaces} from "inversify";
import "0.Bootstrap/Common/AppContainer/LazyInject"

import * as React from "react";
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {ILogger, ILoggerKey} from "../../Common/Services/Logging/ILogger"
import {IClientApplication} from "0.Bootstrap/Common/Application/IClientApplication"
import {IHeader, IHeaderKey} from "../Header/IHeader"
import {ISideBar, ISideBarKey} from "../SideBar/ISideBar"
import {ISideBarService, ISideBarServiceKey } from "../SideBar/ISideBarService"
import {IContent, IContentKey} from "../Content/IContent"

import "./Style.sass"
import style from "./Style.sass"

@withRouter 
@observer
@injectable()
export class ClientApplication extends React.Component<any, any> implements IClientApplication  {

    @lazyInject(ILoggerKey)
    public logger : ILogger;

    @lazyInject(IHeaderKey)
    public Header : interfaces.Newable<IHeader>;

    @lazyInject(ISideBarKey)
    public SideBar : interfaces.Newable<ISideBar>;

    @lazyInject(ISideBarServiceKey)
    public sideBarService : ISideBarService;    

    @lazyInject(IContentKey)
    public Content : interfaces.Newable<IContent>;

    constructor() {
        super();
    }
   
    render() {   
        const styles = "vertical basic " + style.delete;  
        this.logger.Info("some info from client logger");  
        return <div>

            <DevTools/>  
        </div>    
    }
}