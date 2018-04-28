import * as React from "react";
import {injectable, interfaces} from "inversify";
import * as classNames from "classnames";
import {IContainer} from "./IContainer"
import {IHeader, IHeaderKey} from "./Header/IHeader"
import {ISideBar, ISideBarKey} from "./SideBar/ISideBar"
import {IContent, IContentKey} from "./Content/IContent"
import {IFooter, IFooterKey} from "./Footer/IFooter"

import { lazyInject } from "0.Bootstrap/Common/AppContainer/LazyInject";
import {ILoggerKey, ILogger} from "1.Framework/Common/Services/Logging/ILogger"

import style from "Style.less"

@injectable()
export class Container extends React.PureComponent<any, any> implements IContainer  {

    @lazyInject(IHeaderKey)
    public Header : interfaces.Newable<IHeader>;

    @lazyInject(ISideBarKey)
    public SideBar : interfaces.Newable<ISideBar>;

    @lazyInject(IContentKey)
    public Content : interfaces.Newable<IContent>;

    @lazyInject(IFooterKey)
    public Footer : interfaces.Newable<IFooter>;

    @lazyInject(ILoggerKey)
    public logger:ILogger

    render() {
        return <div>
            <this.Header MenubarVisible={true}/>
            <div className={classNames(style.container)}>          
                <div className={classNames(style.columns)}>
                    <div className={classNames(style.column, style.is3)}>
                        <this.SideBar/>
                    </div>
                    <div className={style.column}>
                        <this.Content/>
                    </div>
                </div>
            </div>
            <this.Footer />
        </div>
    }
}