import * as React from "react";
import {injectable, inject, interfaces} from "inversify";
import "Common/AppContainer/LazyInject"

import {IApplication} from "Client/Contracts/Layout/IApplication"
import {IHeader, IHeaderKey} from "Client/Contracts/Layout/IHeader"

import {Grid, Container} from "semantic-ui-react"
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import "./test.scss"

@injectable()
export class Application extends React.Component<any, any> implements IApplication  {

    @lazyInject(IHeaderKey)
    public Header : interfaces.Newable<IHeader>;

    public SomeString : string;

    constructor(props, context) {
        super(props, context);

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
                <Sidebar as={Menu} animation='overlay' width='wide' visible={visible} icon='labeled' vertical>
                    <Menu.Item name='home'>
                    <Icon name='home' />
                    Home
                    </Menu.Item>
                    <Menu.Item name='gamepad'>
                    <Icon name='gamepad' />
                    Games
                    </Menu.Item>
                    <Menu.Item name='camera'>
                    <Icon name='camera' />
                    Channels
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher as={Segment} className="vertical basic" dimmed={visible}>
                    <Container textAlign="justified">
                        <img className="ui image" src="https://react.semantic-ui.com/assets/images/wireframe/paragraph.png"/>                                    
                    </Container>                                     
                </Sidebar.Pusher>
            </Sidebar.Pushable>  
            <Button onClick={toggleVisibility}>Toggle Visibility</Button>                                                                
        </div>       
    }
}