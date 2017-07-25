import * as React from "react";
import * as ReactDOM from "react-dom";

import * as ReactMarkdown from "react-markdown"

import { Segment } from 'semantic-ui-react'

import 'highlight.js/styles/vs.css';
import * as hljs from 'highlight.js'

import './CodeBlock.css'

let h = React.createElement;

let CodeBlock = React.createClass({
    displayName: 'CodeBlock',
    propTypes: {
        literal: React.PropTypes.string,
        language: React.PropTypes.string
    },

    componentDidMount: function() {
        this.highlightCode();
    },

    componentDidUpdate: function() {
        this.highlightCode();
    },

    highlightCode: function() {
        hljs.highlightBlock(this.refs.code);
    },

    render: function() {
        return <Segment>
            <pre>
                <code ref='code' className='{this.props.language}'>{this.props.literal}</code>
            </pre>
            </Segment>
    }
});

var codeBlock  = React.createFactory(CodeBlock);

export {codeBlock};

