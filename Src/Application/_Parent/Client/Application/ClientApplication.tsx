import * as React from "react";
import {BrowserRouter} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {injectable, interfaces} from "inversify";

import { lazyInject } from "./../../_Parent/Common/AppContainer/LazyInject";
import {IClientApplication} from "./../../_Parent/Common/Application/IClientApplication"

import {IContainer, IContainerKey} from "../Container/IContainer"

@withRouter 
@observer
@injectable()
export class ClientApplication extends React.Component<any, any> implements IClientApplication  {

    @lazyInject(IContainerKey)
    public Container : interfaces.Newable<IContainer>;

    DevTools(){
        if(process.env.NODE_ENV == 'production'){
            return (null);
        }
        return <DevTools/>       
    }
   
    render() {   
        return <div>              
                    <this.Container/>
                    <this.DevTools/>
                </div>         
    }
}
