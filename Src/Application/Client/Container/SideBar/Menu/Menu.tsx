import * as React from "react";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import { injectable, interfaces } from "inversify";
import classNames from "classnames";

import { lazyMultiInject } from "../../../../_Parent/_Parent/Common/AppContainer/LazyInject";

import { IMenu, IMenuProps, IMenuRoutePropsKey, IMenuRouteProps } from "../../../../Client/Container/SideBar/Menu/IMenu";
import { IBlogMenuKey, IBlogMenu } from "../../../../Client/Container/SideBar/Menu/BlogMenu/IBlogMenu";

import style from "Theme/Style.less";

@injectable()
@observer
export class Menu extends React.Component<IMenuProps> implements IMenu  {

     @lazyMultiInject(IMenuRoutePropsKey)
     public menuRouteProps : IMenuRouteProps[];

    constructor(props:IMenuProps) {
        super(props);
    }
    
    render() {
        return <div className={this.props.ClassNames}>
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