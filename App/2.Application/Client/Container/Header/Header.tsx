import * as React from "react";
import {Link} from 'react-router-dom'
import {injectable, interfaces} from "inversify";
import * as classNames from "classnames"

import {IResponsiveService, IResponsiveServiceKey} from "../../../../1.Framework/Client/Lib/Responsive/IResponsiveService"
import {IHeader} from "../../../../1.Framework/Client/Container/Header/IHeader"
import {IMenuBar,IMenuBarKey} from "./MenuBar/IMenuBar" 
import {ISideBarControl, ISideBarControlKey} from "./SideBarControl/ISideBarControl"

import style from "Style.sass"

@injectable()
export class Header extends React.Component<any, any> implements IHeader  {

    private displayMenuBar:boolean;

    @lazyInject(IResponsiveServiceKey)
    public ResponsiveService : IResponsiveService;

    @lazyInject(IMenuBarKey)
    public MenuBar : interfaces.Newable<IMenuBar>;

    @lazyInject(ISideBarControlKey)
    public SideBarControl : interfaces.Newable<ISideBarControl>;

    constructor() {
        super();
    }

    render() {
        return <div>    
                    <div className={classNames(style.hero, style.isPrimary)}>  
                        {this.ResponsiveService.IsDesktop &&
                            <div className={style.heroHead}>   
                                <this.MenuBar></this.MenuBar>
                            </div>
                        }
                        {(this.ResponsiveService.IsMobile || this.ResponsiveService.IsTablet) &&
                            <this.SideBarControl></this.SideBarControl>
                        }  
                        <div className={classNames(style.heroBody, {[style.removeTopPadding]:this.ResponsiveService.IsDesktop})}>
                            <div className={classNames(style.container, style.hasTextCentered)}>                                
                                <h1 className={classNames(style.title, style.isSize1)}>
                                    Technically A Blog
                                </h1>
                                <h2 className={classNames(style.subtitle, style.isSize3)}>
                                    or so I think...
                                </h2>
                            </div>
                        </div>
                    </div>                   
                </div>

    }
}