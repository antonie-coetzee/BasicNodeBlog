import * as React from "react";
import {injectable, inject, interfaces} from "inversify";
import "Common/Container/LazyInject"

import {IApplication} from "Client/Contracts/IApplication"
import {ISearchBar,ISearchBarKey} from "Client/Contracts/ISearchBar"

@injectable()
export class Application extends React.Component<any, any> implements IApplication  {

    @lazyInject(ISearchBarKey)
    public SearchBar : interfaces.Newable<ISearchBar>;

    public SomeString : string;

    constructor(props, context) {
        super(props, context);
        this.SomeString = "asd";
    }

    render() {
        return <div>
                Hallo!
                <this.SearchBar/>
            </div>
    }
}