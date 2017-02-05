import * as React from "react";

export interface testProps { compiler: string; framework: string; }

export class HelloExternal extends React.Component<testProps, undefined> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}