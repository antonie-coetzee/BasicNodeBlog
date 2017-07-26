import * as React from "react";
import {injectable} from "inversify";

import {ISearchBar} from "Client/Contracts/ISearchBar"

@injectable()
export class SearchBarEmpty extends React.Component<any, any> implements ISearchBar  {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
                the original searchbar
            </div>
    }
}