import * as React from "react";
import { IArticleTree } from "../../../../Common/Services/Article/IArticleService";
import { IPriorityRouteProps } from "../../../../_Parent/Client/Lib/Route/IPriorityRouteProps";

export interface IMenuProps {
    ClassNames?:string;
}

export interface IMenuRouteProps extends IPriorityRouteProps {
}
export let IMenuRoutePropsKey = "IMenuRouteKey";

export interface IMenu extends React.Component<IMenuProps> {}
export let IMenuKey = "IMenuKey";
