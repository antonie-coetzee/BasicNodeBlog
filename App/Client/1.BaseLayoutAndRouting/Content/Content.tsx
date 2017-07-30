import * as React from "react";
import {injectable} from "inversify";

import {IContent} from "./IContent"

@injectable()
export class Content extends React.Component<any, any> implements IContent  {
    constructor() {
        super();
    }

    render() {
        return <img className="ui image" src="https://react.semantic-ui.com/assets/images/wireframe/paragraph.png"/>  
    }
}