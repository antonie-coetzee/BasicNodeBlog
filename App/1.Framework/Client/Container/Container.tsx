import * as React from "react";
import {injectable, interfaces} from "inversify";
import {IContainer} from "./IContainer"
import {ISideBar, ISideBarKey} from "../Container/SideBar/ISideBar"
import {IContent, IContentKey} from "../Container/Content/IContent"

import style from "../Style/Style.sass"

@injectable()
export class Container extends React.PureComponent<any, any> implements IContainer  {

    @lazyInject(ISideBarKey)
    public SideBar : interfaces.Newable<ISideBar>;

    @lazyInject(IContentKey)
    public Content : interfaces.Newable<IContent>;

    constructor() {
        super();
    }

    render() {
        return <div className={style.container}>
            <div className={style.columns}>
                <div className={style.column + style.is3}>
                    <this.SideBar/>
                </div>
                <div className={style.column}>
                    <this.Content/>
                </div>
            </div>
        </div>
    }
}