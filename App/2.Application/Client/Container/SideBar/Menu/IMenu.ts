import * as React from "react";
import { IArticleTree } from "2.Application/Common/Services/Article/IArticleService";
import { IPriorityRouteProps } from "1.Framework/Client/Lib/Route/IPriorityRouteProps";

export interface IMenuProps {
}

export interface IMenuRouteProps extends IPriorityRouteProps {
}
export let IMenuRoutePropsKey = "IMenuRouteKey";

export interface IMenu extends React.Component<IMenuProps> {}
export let IMenuKey = "IMenuKey";
