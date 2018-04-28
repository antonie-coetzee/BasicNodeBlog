import * as React from "react"
import { RouteProps } from "react-router";
import { interfaces } from "inversify";
import { IPriorityRouteProps } from "1.Framework/Client/Lib/Route/IPriorityRouteProps";


export default function BindRouteProps<TRoute extends IPriorityRouteProps, TComponent extends React.Component>(
    bind: interfaces.Bind,
    componentKey: string | symbol,
    routeKey: string | symbol,
    routeProps: IPriorityRouteProps) {

    if(bind == null) throw new Error('bind is null or undefined');
    if(componentKey == null) throw new Error('componentKey is null or undefined');
    if(routeKey == null) throw new Error('routeKey is null or undefined');
    if(routeProps == null) throw new Error('routeProps is null or undefined');

    bind<TRoute>(routeKey)
        .toDynamicValue((ctx) => {
            let cmp = ctx.container.get<interfaces.Newable<TComponent>>(componentKey);
            routeProps.component = cmp;
            return <TRoute>{...routeProps};
            }
        );
};
