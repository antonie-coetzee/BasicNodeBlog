import * as React from "react";

export interface ISideBarProps {
    styles?:string
}

export interface ISideBar extends React.Component<ISideBarProps, any> {}
export let ISideBarKey = "ISideBar";