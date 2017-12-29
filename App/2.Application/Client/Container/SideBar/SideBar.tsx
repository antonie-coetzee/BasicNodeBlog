import * as React from "react";
import {injectable} from "inversify";
import * as classNames from "classnames";

import {ISideBar} from "../../../../1.Framework/Client/Container/SideBar/ISideBar"

import style from "Style.sass"

const profile = require('./profile.jpg')

@injectable()
export class SideBar extends React.Component<any, any> implements ISideBar  {
    render() {
        return <aside className={style.menu}>         
        <div className={classNames(style.card, style.removeBoxShadow)}>
            <div className={style.cardImage}>
            <div className={classNames(style.avatarContainer)}>
              <img src={profile} alt="Image" className={classNames(style.avatar, style.hasShadow)}></img>       
            </div>  
            </div>
            <div className={style.cardContent}>
                <p className={classNames(style.title, style.is6, style.hasTextCentered)}>Antonie Coetzee</p>             
            </div>
        </div>          
         
        <p className="menu-label">
          Administration
        </p>
        <ul className="menu-list">
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
      </aside>
    }
}