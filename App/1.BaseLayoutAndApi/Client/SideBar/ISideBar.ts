import * as React from "react";

export interface ISideBarProps  {
    visible:boolean;
}

export interface ISideBar extends React.PureComponent<ISideBarProps, any> {}
export let ISideBarKey = "ISideBar";