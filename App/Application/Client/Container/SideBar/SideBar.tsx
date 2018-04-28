import * as React from "react";
import { observer } from "mobx-react";
import { injectable, interfaces } from "inversify";

import { lazyInject } from "0.Bootstrap/Common/AppContainer/LazyInject";
import { ISideBar, ISideBarProps } from "1.Framework/Client/Container/SideBar/ISideBar"
import { IAvatar, IAvatarKey } from "2.Application/Client/Container/SideBar/Avatar/IAvatar";
import { IMenuKey, IMenu } from "2.Application/Client/Container/SideBar/Menu/IMenu";

import style from "Style.less"

const profile = require('./profile.jpg')

@observer
@injectable()
export class SideBar extends React.Component<ISideBarProps> implements ISideBar  {
    
  constructor(props:ISideBarProps) {
      super(props);
  }

  @lazyInject(IAvatarKey)
  public Avatar : interfaces.Newable<IAvatar>;

  @lazyInject(IMenuKey)
  public Menu : interfaces.Newable<IMenu>;

  render() {
    return <div className={this.props.styles} style={{height:300}}>         
              <this.Menu />         
            </div>
  }
}