import * as React from "react";
import { observer } from "mobx-react";
import { injectable, interfaces } from "inversify";

import { lazyInject } from "../../../_Parent/_Parent/Common/AppContainer/LazyInject";
import { ISideBar, ISideBarProps } from "../../../_Parent/Client/Container/SideBar/ISideBar"
import { IAvatar, IAvatarKey } from "../../../Client/Container/SideBar/Avatar/IAvatar";
import { IMenuKey, IMenu } from "../../../Client/Container/SideBar/Menu/IMenu";

import style from "Theme/Style.less"

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