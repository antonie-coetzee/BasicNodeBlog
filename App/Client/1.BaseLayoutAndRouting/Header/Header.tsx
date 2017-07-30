import * as React from "react";
import {injectable, interfaces} from "inversify";

import {ISideBarService, ISideBarServiceKey} from "../SideBar/ISideBarService"
import {IHeader} from "./IHeader"

import {Container, Button, Header as UIHeader} from "semantic-ui-react"

@injectable()
export class Header extends React.Component<any, any> implements IHeader  {

    @lazyInject(ISideBarServiceKey)
    private sideBarService : ISideBarService;

    constructor(props, context) {
        super(props, context);
    }

    public toggleVisible = () => {
        this.sideBarService.toggleVisible();
    }

    render() {
        return <Container>
                <UIHeader as="h1" textAlign="center">Header container...</UIHeader>  
                <Button onClick={this.toggleVisible} primary>Toggle Visibility</Button>                    
        </Container>
    }
}