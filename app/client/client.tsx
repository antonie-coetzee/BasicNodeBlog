import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactMarkdown from "react-markdown"

import 'semantic-ui-css/semantic.min.css';

import { Dropdown } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'

import { codeBlock } from './CodeBlock'

import {IMetaHeader} from "common/IMetaHeader" 

import {interfaces} from "inversify"

export interface HelloProps { compiler: string; framework: string; }

export interface PostComponent extends React.PureComponent<any, any> {}

class Component extends React.Component<any, any>  {
    constructor(props, context) {
        super(props, context);
    }
}


class TestComponent extends React.Component<any, any> implements PostComponent  {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
                Hallo!
            </div>
    }
}

export class Post extends React.Component<any, any> implements PostComponent {
    //private Tester:  new(props, context) => React.Component<any, any>;

    private Tester: interfaces.Newable<PostComponent>;
    
    private StatelessTester: React.SFC<void>;
    private markdown: string;
    constructor(props, context) {
        super(props, context);
        this.Tester = TestComponent;
        this.StatelessTester = () => {return <div>hey there</div>;}
        this.markdown =
`
# H1
* item 1
    * item 2

[<img src="./images/ants.jpg">](http://google.com.au/)

# Live demo

Changes are automatically rendered as you type.

* Follows the [CommonMark](http://commonmark.org/) spec
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
    This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
    <Markdown source="# Your markdown here" />,
    document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal
`;
    }


    render() {
        return <Container>
            <div>
                <ReactMarkdown source={this.markdown} renderers = {Object.assign({}, ReactMarkdown.renderers, { CodeBlock: codeBlock })} />
            </div>
            <this.Tester></this.Tester>
        </Container>
    }
}

ReactDOM.render(
    <Post data="{markdown}" />,
    document.getElementById("app")
);