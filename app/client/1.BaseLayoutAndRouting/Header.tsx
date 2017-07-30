import * as React from "react";
import {injectable, interfaces} from "inversify";

import {ISideBarControl, ISideBarControlKey} from "Client/Contracts/Layout/ISideBarControl"

import {IHeader} from "Client/Contracts/Layout/IHeader"

import {Container, Button, Header as UIHeader} from "semantic-ui-react"

@injectable()
export class Header extends React.Component<any, any> implements IHeader  {

    @lazyInject(ISideBarControlKey)
    private sideBarControl : ISideBarControl;

    constructor(props, context) {
        super(props, context);
    }

    public toggleVisible = () => {
        this.sideBarControl.toggleVisible();
    }

    render() {
        return <Container>
                <UIHeader as="h1" textAlign="center">Header container...</UIHeader>  
                <Button onClick={this.toggleVisible} primary>Toggle Visibility</Button>                    
        </Container>
    }
}