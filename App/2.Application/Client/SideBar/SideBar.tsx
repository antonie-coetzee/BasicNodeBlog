import * as React from "react";
import {injectable} from "inversify";

import {ISideBar} from "../../../1.Framework/Client/SideBar/ISideBar"

@injectable()
export class SideBar extends React.PureComponent<any, any> implements ISideBar  {
    constructor() {
        super();
    }

    render() {
        return <div></div>
    }
}