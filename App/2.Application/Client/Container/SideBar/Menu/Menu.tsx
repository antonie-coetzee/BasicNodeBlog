import * as React from "react";
import { observer } from "mobx-react";
import { injectable, interfaces } from "inversify";
import * as classNames from "classnames";

import { IMenu, IMenuProps } from "2.Application/Client/Container/SideBar/Menu/IMenu";
import { IBlogMenuKey, IBlogMenu } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/IBlogMenu";

import style from "Style.sass";

@injectable()
@observer
export class Menu extends React.Component<IMenuProps> implements IMenu  {

    @lazyInject(IBlogMenuKey)
    public BlogMenu : interfaces.Newable<IBlogMenu>;

    constructor(props:IMenuProps) {
        super(props);
    }
    
    render() {
        return <div>
                    <this.BlogMenu />
                </div>
    }
}