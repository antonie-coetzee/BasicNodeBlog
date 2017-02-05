import * as React from "react";
import {HelloExternal} from "./client/test"

export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps, undefined> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}

console.log((new HelloExternal()).render());