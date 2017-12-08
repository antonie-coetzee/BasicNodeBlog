import "0.Bootstrap/Common/AppContainer/LazyInject"

import * as React from "react";
import {BrowserRouter} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {injectable, interfaces} from "inversify";
import {IClientApplication} from "0.Bootstrap/Common/Application/IClientApplication"

import makeAsyncComponent from "../../Common/Lib/AsyncComponent"

import {IContainer, IContainerKey} from "../Container/IContainer"

@withRouter 
@observer
@injectable()
export class ClientApplication extends React.Component<any, any> implements IClientApplication  {

    @lazyInject(IContainerKey)
    public Container : Promise<interfaces.Newable<IContainer>>;
    public ContainerAsync : React.ComponentClass

    componentWillMount(){
        this.ContainerAsync = makeAsyncComponent(()=>{return this.Container});
    }

    DevTools(){
        if(process.env.NODE_ENV == 'production'){
            return (null);
        }
        return <DevTools/>       
    }
   
    render() {   
        return <div>              
                    <this.ContainerAsync/>
                    <this.DevTools/>
                </div>         
    }
}
