import * as React from "react";
import {injectable} from "inversify";

import {IHeader} from "Client/Contracts/Layout/IHeader"

import {Container, Header as UIHeader} from "semantic-ui-react"

@injectable()
export class Header extends React.Component<any, any> implements IHeader  {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <Container>
                <UIHeader as="h1" textAlign="center">Header container...</UIHeader>                
        </Container>
    }
}