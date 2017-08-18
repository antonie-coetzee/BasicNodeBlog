import * as React from "react";
import {injectable} from "inversify";

import {ISideBar, ISideBarProps} from "./ISideBar"

@injectable()
export class SideBar extends React.PureComponent<ISideBarProps, any> implements ISideBar  {
    constructor(props:ISideBarProps) {
        super(props);
    }

    render() {
        return <div></div>
    }
}