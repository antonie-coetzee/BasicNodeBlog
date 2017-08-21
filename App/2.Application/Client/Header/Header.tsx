import * as React from "react";
import {Link} from 'react-router-dom'
import {injectable, interfaces} from "inversify";

import {ISideBarService, ISideBarServiceKey} from "../SideBar/ISideBarService"
import {IHeader} from "../../../1.Framework/Client/Header/IHeader"

@injectable()
export class Header extends React.Component<any, any> implements IHeader  {

    @lazyInject(ISideBarServiceKey)
    private sideBarService : ISideBarService;

    constructor(props, context) {
        super(props, context);
    }

    public toggleVisible = () => {
        this.sideBarService.toggleVisible();
    }

    render() {
        return <div></div>
    }
}