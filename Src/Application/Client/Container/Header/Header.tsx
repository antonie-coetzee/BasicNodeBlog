import * as React from "react";
import { observer } from "mobx-react";
import {Link, withRouter, Switch, Route} from 'react-router-dom'
import {injectable, interfaces} from "inversify";
import classNames from "classnames";
import { lazyInject, lazyMultiInject } from "../../../_Parent/_Parent/Common/AppContainer/LazyInject";

import {IResponsiveService, IResponsiveServiceKey} from "../../../_Parent/Client/Lib/Responsive/IResponsiveService"
import {IHeader} from "../../../_Parent/Client/Container/Header/IHeader"
import {IMenuBar,IMenuBarKey} from "./MenuBar/IMenuBar" 
import {ISideBarControl, ISideBarControlKey} from "./SideBarControl/ISideBarControl"
import { ITitleRouteProps, ITitleRoutePropsKey } from "../../../Client/Container/Header/Title/ITitle";

import style from "Theme/Style.less"

import  {TransitionGroup} from 'react-transition-group';
import Transition from "react-transition-group/Transition";

@injectable()
@observer
export class Header extends React.Component<any, any> implements IHeader  {
    @lazyMultiInject(ITitleRoutePropsKey)
    public titleRouteProps : ITitleRouteProps[];

    @lazyInject(IResponsiveServiceKey)
    public ResponsiveService : IResponsiveService;

    @lazyInject(IMenuBarKey)
    public MenuBar : interfaces.Newable<IMenuBar>;

    @lazyInject(ISideBarControlKey)
    public SideBarControl : interfaces.Newable<ISideBarControl>;

    render() {
        const duration = 700;

        const defaultStyle = {
          transition: `opacity ${duration}ms ease-in-out`,
          opacity: 0,
        }
        
        const transitionStyles = {
          entering: { opacity: 0 },
          entered:  { opacity: 1 },
        };

        return <div>    
                    <div className={classNames('style.hero', 'style.isPrimary')}>  
                        {this.ResponsiveService.IsDesktop &&
                            <div className={'style.heroHead'}>   
                                <this.MenuBar></this.MenuBar>
                            </div>
                        }
                        {(this.ResponsiveService.IsMobile || this.ResponsiveService.IsTablet) &&
                            <this.SideBarControl></this.SideBarControl>
                        }  
                        <div className={classNames('style.heroBody', {['style.removeTopPadding']:this.ResponsiveService.IsDesktop})}>
                            <TransitionGroup>
                                <Transition timeout={700} in={true}>
                                    <Switch>
                                        {this.titleRouteProps
                                                .sort((r1,r2) => r2.priority - r1.priority)
                                                .map((el, index)=>{
                                                    return <Route key={index} {...el}/>
                                                })
                                        }
                                        <Route path="/*" render={()=>
                                            <div className={classNames('style.hasTextCentered')}>
                                                <h1 className={classNames('style.title', 'style.isSize1')}>
                                                    Title
                                                </h1>
                                                <h2 className={classNames('style.subtitle', 'style.isSize3')}>
                                                    sub title
                                                </h2>
                                            </div>}/> 
                                    </Switch>
                                </Transition>
                            </TransitionGroup>
                        </div>
                    </div>                   
                </div>
    }
}