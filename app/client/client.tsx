import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactMarkdown from "react-markdown"

import 'semantic-ui-css/semantic.min.css';

import { Dropdown } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'


import { codeBlock } from './CodeBlock'

export interface HelloProps { compiler: string; framework: string; }

export interface PostComponent extends React.ComponentLifecycle<any, any> { }

export class Post extends React.Component<any, any> implements PostComponent {
    private markdown: string;
    constructor(props, context) {
        super(props, context);
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

    private options = [
        { key: 1, text: 'Choice 1', value: 1 },
        { key: 2, text: 'Choice 2', value: 2, disabled: true },
        { key: 3, text: 'Choice 4', value: 3 },
    ]

    render() {
        return <Container>
            <div>
        <ReactMarkdown source={this.markdown} renderers = {Object.assign({}, ReactMarkdown.renderers, { CodeBlock: codeBlock })} />
                <Dropdown text='Dropdown' options={this.options} open />
            </div>
        </Container>
    }
}

ReactDOM.render(
    <Post data="{markdown}" />,
    document.getElementById("app")
);