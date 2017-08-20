import "0.Bootstrap/Common/AppContainer/LazyInject"

import * as React from "react";
import {withRouter} from 'react-router-dom'
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {injectable, interfaces} from "inversify";
import {IClientApplication} from "0.Bootstrap/Common/Application/IClientApplication"
import {IHeader, IHeaderKey} from "../Header/IHeader"
import {ISideBar, ISideBarKey} from "../SideBar/ISideBar"
import {IContent, IContentKey} from "../Content/IContent"

import "./Style.sass"
import style from "./Style.sass"

@withRouter 
@observer
@injectable()
export class ClientApplication extends React.Component<any, any> implements IClientApplication  {

    @lazyInject(IHeaderKey)
    public Header : interfaces.Newable<IHeader>;

    @lazyInject(ISideBarKey)
    public SideBar : interfaces.Newable<ISideBar>;

    @lazyInject(IContentKey)
    public Content : interfaces.Newable<IContent>;

    constructor() {
        super();
    }
   
    render() {   
        return <div>
            <this.Header/>
            <this.SideBar/>
            <this.Content/>
            <DevTools/>  
        </div>    
    }
}