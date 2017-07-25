import * as React from "react";
import * as ReactDOM from "react-dom";
import {injectable} from "inversify";

import {IApplication} from "Client/Contracts/IApplication"

@injectable()
export class Application extends React.Component<any, any> implements IApplication  {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
                Hallo!
            </div>
    }
}