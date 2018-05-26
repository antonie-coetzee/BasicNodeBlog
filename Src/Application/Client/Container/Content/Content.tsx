import * as React from "react";
import { withRouter, Switch, Route } from "react-router";
import { observer } from "mobx-react";
import {injectable, interfaces} from "inversify";

import { lazyInject, lazyMultiInject } from "../../../_Parent/_Parent/Common/AppContainer/LazyInject";
import {IContent, IContentRoutePropsKey, IContentRouteProps} from "../../../_Parent/Client/Container/Content/IContent";

import { IBlogContentKey, IBlogContent } from "../../../Client/Container/Content/Blog/IBlogContent";

import style from "Theme/Style.less"

@injectable()
@observer
export class Content extends React.Component<any, any> implements IContent  {

    @lazyMultiInject(IContentRoutePropsKey)
    public contentRouteProps : IContentRouteProps[];

    @lazyInject(IBlogContentKey)
    public BlogWrapper : interfaces.Newable<IBlogContent>;

    render(){
        return  <div>
                    <Switch>
                        {this.contentRouteProps
                            .sort((r1,r2) => r2.priority - r1.priority)
                            .map((el, index)=>{
                                return <Route key={index} {...el}/>
                            })
                        }
                        <Route path="/*" render={()=><p>content not found</p>}/> 
                    </Switch>
                </div>
    }
}
