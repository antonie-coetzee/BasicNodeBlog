import * as React from "react";
import { Switch, Route, withRouter } from "react-router";
import { observer } from "mobx-react";
import { injectable, interfaces } from "inversify";
import * as classNames from "classnames";

import { lazyMultiInject } from "0.Bootstrap/Common/AppContainer/LazyInject";

import { IMenu, IMenuProps, IMenuRoutePropsKey, IMenuRouteProps } from "2.Application/Client/Container/SideBar/Menu/IMenu";
import { IBlogMenuKey, IBlogMenu } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/IBlogMenu";

import style from "Style.sass";

@withRouter
@injectable()
@observer
export class Menu extends React.Component<IMenuProps> implements IMenu  {

     @lazyMultiInject(IMenuRoutePropsKey)
     public menuRouteProps : IMenuRouteProps[];

    constructor(props:IMenuProps) {
        super(props);
    }
    
    render() {
        return <div>
                    <Switch>
                        {this.menuRouteProps
                                .sort((r1,r2) => r2.priority - r1.priority)
                                .map((el, index)=>{
                                    return <Route key={index} {...el}/>
                                    })
                        }
                        <Route path="/*" render={()=><p>menu not found</p>}/> 
                    </Switch>
                </div>
    }
}