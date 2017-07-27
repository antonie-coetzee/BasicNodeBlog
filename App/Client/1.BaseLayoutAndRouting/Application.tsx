import * as React from "react";
import {injectable, inject, interfaces} from "inversify";
import "Common/AppContainer/LazyInject"

import {IApplication} from "Client/Contracts/Layout/IApplication"
import {IHeader, IHeaderKey} from "Client/Contracts/Layout/IHeader"

import 'semantic-ui-css/semantic.min.css';
import "./test.scss"

@injectable()
export class Application extends React.Component<any, any> implements IApplication  {

    @lazyInject(IHeaderKey)
    public Header : interfaces.Newable<IHeader>;

    public SomeString : string;

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
                <this.Header/>
            </div>
    }
}