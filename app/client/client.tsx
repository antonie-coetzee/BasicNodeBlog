import * as React from "react";
import * as ReactDOM from "react-dom";
import * as marked from 'marked'

export interface HelloProps { compiler: string; framework: string; }

export class Post extends React.Component<any,any>{
  constructor(props, context) {
    super(props, context);
  }

  rawMarkup() {
    let rawMarkup = marked(this.props.data, {sanitize: true});
    return { __html: rawMarkup };
  }

  render() {
    return <div className="post">
     <span dangerouslySetInnerHTML={this.rawMarkup()} />;
    </div>;
  }
}


ReactDOM.render(
    <Post data="I am using __markdown__." />,
    document.getElementById("app")
);