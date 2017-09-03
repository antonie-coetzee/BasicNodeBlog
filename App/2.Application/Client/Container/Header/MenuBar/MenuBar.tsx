import * as React from "react";
import {Link} from 'react-router-dom'
import {injectable, interfaces} from "inversify";
import * as classNames from "classnames"

import {IMenuBar} from "./IMenuBar"

import style from "Style.sass"

@injectable()
export class MenuBar extends React.Component<any, any> implements IMenuBar  {

   constructor() {
        super();
    }

    render() {
        return <header className={classNames(style.nav, style.removeBoxShadow)}>
                    <div className={style.container}>
                        <div className={style.navLeft}>
                            <a className={classNames(style.isPrimary, style.navItem)}>
                                <span className={classNames(style.icon)}>
                                    <i className={classNames(style.fa, style.faGithubSquare, style.isSize3)}></i>
                                </span>
                            </a>
                            <a className={classNames(style.isPrimary, style.navItem, style.isPaddingless)}>
                                <span className={classNames(style.icon)}>
                                    <i className={classNames(style.fa, style.faLinkedinSquare, style.isSize3)}></i>
                                </span>
                            </a> 
                            <a className={classNames(style.isPrimary, style.navItem)}>
                                <span className={classNames(style.icon)}>
                                    <i className={classNames(style.fa, style.faTwitterSquare, style.isSize3)}></i>
                                </span>
                            </a>                                                                                        
                        </div>
                        <div className="nav-right nav-menu">                   
                            <span className="nav-item">
                                <p className={classNames(style.control, style.hasIconsLeft)}>
                                    <input className={style.input} type="text" placeholder="search"></input>
                                    <span className={classNames(style.icon, style.isSmall, style.isLeft)}>
                                        <i className={classNames(style.fa, style.faSearch)}></i>
                                    </span>
                                </p>
                            </span>
                        </div>
                    </div>
                </header>
    }
}