import * as React from "react";
import { IArticleTree } from "2.Application/Common/Services/Article/IArticleService";
import { IRoute } from "1.Framework/Client/Lib/Route/IRoute";

export interface IMenuProps {
}

export interface IMenuRoute extends IRoute {
}

export interface IMenu extends React.Component<IMenuProps> {}
export let IMenuKey = "IMenuKey";
export let IMenuRouteKey = "IMenuRouteKey";