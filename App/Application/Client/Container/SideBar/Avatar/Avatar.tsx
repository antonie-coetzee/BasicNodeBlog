import * as React from "react";
import { injectable, interfaces } from "inversify";
import * as classNames from "classnames";

import { IAvatar, IAvatarProps } from "2.Application/Client/Container/SideBar/Avatar/IAvatar";

import style from "Style.less";

@injectable()
export class Avatar extends React.Component<IAvatarProps> implements IAvatar  {

    constructor(props:IAvatarProps) {
        super(props);
    }
    
    render() {
        return <div className={classNames(style.avatarContainer)}>
                    <img src={this.props.imageSrc} alt="Image" className={classNames(style.avatar)}></img>       
                </div> 
    }
}