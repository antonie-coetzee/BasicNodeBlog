import "0.Bootstrap/Common/AppContainer/LazyInject"

import * as React from "react";
import {BrowserRouter} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {injectable, interfaces} from "inversify";
import {IClientApplication} from "0.Bootstrap/Common/Application/IClientApplication"

import {IHeader, IHeaderKey} from "../Header/IHeader"
import {IContainer, IContainerKey} from "../Container/IContainer"


import "../Style/Style.sass"
import style from "../Style/Style.sass"

@withRouter 
@observer
@injectable()
export class ClientApplication extends React.Component<any, any> implements IClientApplication  {

    @lazyInject(IHeaderKey)
    public Header : interfaces.Newable<IHeader>;

    @lazyInject(IContainerKey)
    public Container : interfaces.Newable<IContainer>;

    constructor() {
        super();
    }

    DevTools(){
        if(process.env.NODE_ENV == 'production'){
            return (null);
        }
        return <DevTools/>       
    }
   
    render() {   
        return <div>
                    <this.Header/>
                    <this.Container/>
                    <this.DevTools/>  
                </div>         
    }
}