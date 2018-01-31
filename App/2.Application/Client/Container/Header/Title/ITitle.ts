import * as React from "react";
import { IPriorityRouteProps } from "1.Framework/Client/Lib/Route/IPriorityRouteProps";

export interface ITitleProps {
}

export interface ITitleRouteProps extends IPriorityRouteProps {
}

export let ITitleRoutePropsKey = "ITitleRoutePropsKey";

export interface ITitle extends React.Component<ITitleProps> {}
export let ITitleKey = "ITitleKey";
