import * as React from "react";
import { Switch, Route, withRouter } from "react-router";
import { observer } from "mobx-react";
import { injectable, interfaces } from "inversify";
import * as classNames from "classnames";

import { IMenu, IMenuProps, IMenuRouteKey, IMenuRoute } from "2.Application/Client/Container/SideBar/Menu/IMenu";

import { IBlogMenuKey, IBlogMenu } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/IBlogMenu";

import style from "Style.sass";

@withRouter
@injectable()
@observer
export class Menu extends React.Component<IMenuProps> implements IMenu  {

    // @lazyMultiInject(IMenuRouteKey)
    // public MenuRoutes : IMenuRoute[];

    constructor(props:IMenuProps) {
        super(props);
    }
    
    render() {
        return <div>
                    <Switch>
                        {/* <Route path="/blog/*" component={this.BlogMenu}/> */}
                        <Route path="/*" render={()=><p>content type not matched</p>}/> 
                    </Switch>
                </div>
    }
}