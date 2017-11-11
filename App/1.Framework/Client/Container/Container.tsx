import * as React from "react";
import {injectable, interfaces} from "inversify";
import * as classNames from "classnames";
import {IContainer} from "./IContainer"
import {IHeader, IHeaderKey} from "./Header/IHeader"
import {ISideBar, ISideBarKey} from "./SideBar/ISideBar"
import {IContent, IContentKey} from "./Content/IContent"

import {ILoggerKey, ILogger} from "../../../1.Framework/Common/Services/Logging/ILogger"

import style from "Style.sass"

@injectable()
export class Container extends React.PureComponent<any, any> implements IContainer  {

    @lazyInject(IHeaderKey)
    public Header : interfaces.Newable<IHeader>;

    @lazyInject(ISideBarKey)
    public SideBar : interfaces.Newable<ISideBar>;

    @lazyInject(IContentKey)
    public Content : interfaces.Newable<IContent>;

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
        </div>
    }
}