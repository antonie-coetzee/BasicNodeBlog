import * as React from "react";
import * as ReactDOM from "react-dom"
import * as classNames from "classnames";

//import * as hljs from 'highlight.js'

import style from "Theme/Style.less"

type codeBlockProps = {value:string, language:string};

// export class CodeBlock extends React.Component<codeBlockProps>
// {
//     private codeRef : Node;
//     public displayName:string = 'CodeBlock'

//     constructor(props:codeBlockProps) {
//         super(props);      
//     }

//     componentDidMount() {
//         this.highlightCode();
//     }

//     componentDidUpdate() {
//         this.highlightCode();
//     }

//     highlightCode() {
//         hljs.highlightBlock(this.codeRef);
//     }

//     render() {
//         return <div className={classNames(style.box, style.codeBlock)}>
//                     <pre>   
//                         <code ref={(code) => { this.codeRef = code; }} 
//                                 className={this.props.language}>{this.props.value}</code> 
//                     </pre>            
//                 </div>       
//     }
// }
