import {injectable, interfaces} from "inversify";
import "Common/AppContainer/LazyInject"

import * as React from "react";
import {Container} from "semantic-ui-react"
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import {IApplication} from "Client/Contracts/Layout/IApplication"
import {IHeader, IHeaderKey} from "Client/Contracts/Layout/IHeader"
import {ISideBar, ISideBarKey} from "Client/Contracts/Layout/ISideBar"
import {IContent, IContentKey} from "Client/Contracts/Layout/IContent"

import 'semantic-ui-css/semantic.min.css';
import "./test.scss"

@injectable()
export class Application extends React.Component<any, any> implements IApplication  {

    @lazyInject(IHeaderKey)
    public Header : interfaces.Newable<IHeader>;

    @lazyInject(ISideBarKey)
    public SideBar : interfaces.Newable<ISideBar>;

    @lazyInject(IContentKey)
    public Content : interfaces.Newable<IContent>;

    constructor() {
        super();
        this.state = { visible: false }
    }

    render() {
        
        const toggleVisibility = () => this.setState({ visible: !this.state.visible })
        const { visible } = this.state
        return<div>           
            <Segment vertical={true} attached={true}>
                <this.Header />
            </Segment>                  
            <Sidebar.Pushable as={Segment} className="vertical basic">
                <this.SideBar visible={visible}/>
                <Sidebar.Pusher as={Segment} className="vertical basic" dimmed={visible}>
                    <Container textAlign="justified">
                        <this.Content/>                                 
                    </Container>                                     
                </Sidebar.Pusher>
            </Sidebar.Pushable>  
            <Button onClick={toggleVisibility} primary>Toggle Visibility</Button>                                                                
        </div>       
    }
}