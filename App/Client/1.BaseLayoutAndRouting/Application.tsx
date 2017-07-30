import {injectable, interfaces} from "inversify";
import {observer} from 'mobx-react';
import "Common/AppContainer/LazyInject"

import * as React from "react";
import {Container} from "semantic-ui-react"
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import {IApplication} from "Client/Contracts/Layout/IApplication"
import {IHeader, IHeaderKey} from "Client/Contracts/Layout/IHeader"
import {ISideBar, ISideBarKey} from "Client/Contracts/Layout/ISideBar"
import {IContent, IContentKey} from "Client/Contracts/Layout/IContent"
import {ISideBarControl, ISideBarControlKey} from "Client/Contracts/Layout/ISideBarControl"

import 'semantic-ui-css/semantic.min.css';

import DevTools from 'mobx-react-devtools';
import {sideBar, someClass, someOtherClass} from "Client/1.BaseLayoutAndRouting/test.scss"

@observer
@injectable()
export class Application extends React.Component<any, any> implements IApplication  {

    @lazyInject(IHeaderKey)
    public Header : interfaces.Newable<IHeader>;

    @lazyInject(ISideBarKey)
    public SideBar : interfaces.Newable<ISideBar>;

    @lazyInject(ISideBarControlKey)
    public sideBarControl : ISideBarControl;    

    @lazyInject(IContentKey)
    public Content : interfaces.Newable<IContent>;

    constructor() {
        super();
    }


    render() {        
        const styles = "vertical basic" + sideBar ;
        return<div>           
            <Segment vertical={true} attached={true}>
                <this.Header />
            </Segment>                  
            <Sidebar.Pushable as={Segment} className={styles}>
                <this.SideBar visible={this.sideBarControl.visible}/>
                <Sidebar.Pusher as={Segment} className="vertical basic" dimmed={this.sideBarControl.visible}>
                    <Container textAlign="justified">
                        <this.Content/>                                 
                    </Container>                                     
                </Sidebar.Pusher>
            </Sidebar.Pushable>  
            <DevTools/>                                                         
        </div>       
    }
}