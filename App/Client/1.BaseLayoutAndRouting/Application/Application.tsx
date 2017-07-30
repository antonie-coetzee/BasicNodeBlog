import {injectable, interfaces} from "inversify";
import "Common/AppContainer/LazyInject"

import * as React from "react";
import {BrowserRouter, Route} from 'react-router-dom'
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import {IApplication} from "Client/IApplication"
import {IHeader, IHeaderKey} from "../Header/IHeader"
import {ISideBar, ISideBarKey} from "../SideBar/ISideBar"
import {ISideBarService, ISideBarServiceKey } from "../SideBar/ISideBarService"
import {IContent, IContentKey} from "../Content/IContent"

import 'semantic-ui-css/semantic.min.css';
import {Container, Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react'

@observer
@injectable()
export class Application extends React.Component<any, any> implements IApplication  {

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
        const styles = "vertical basic";    
        return <div>
            <Segment vertical={true} attached={true}>
                <this.Header />
            </Segment>                  
            <Sidebar.Pushable as={Segment} className={styles}>
                <this.SideBar visible={this.sideBarService.visible}/>
                <Sidebar.Pusher as={Segment} className="vertical basic" dimmed={this.sideBarService.visible}>
                    <Container textAlign="justified">
                        <Route path='/test' component={this.Content}/>                             
                    </Container>                                     
                </Sidebar.Pusher>
            </Sidebar.Pushable>  
            <DevTools/>   
        </div>    
    }
}