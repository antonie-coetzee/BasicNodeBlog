import * as React from "react";
import { injectable, interfaces } from "inversify";
import * as classNames from "classnames";

import style from "Style.sass";
import { IBlogMenu, IBlogMenuProps } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/IBlogMenu";

@injectable()
export class BlogMenu extends React.Component<IBlogMenuProps> implements IBlogMenu  {

    constructor(props:IBlogMenuProps) {
        super(props);
    }
    
    render() {
        return <div>
                    <p className="menu-label" >
                        Administration
                    </p>
                    <ul className="menu-list" >
                        <li><a>Team Settings</a></li>
                        <li>
                            <a className="is-active">Manage Your Team</a>
                            <ul>
                                <li><a>Members</a></li>
                                <li><a>Plugins</a></li>
                                <li><a>Add a member</a></li>
                            </ul>
                        </li>
                        <li><a>Invitations</a></li>
                        <li><a>Cloud Storage Environment Settings</a></li>
                        <li><a>Authentication</a></li>
                    </ul>
                </div>
    }
}