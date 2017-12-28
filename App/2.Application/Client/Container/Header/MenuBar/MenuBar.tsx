import * as React from "react";
import {Link} from 'react-router-dom'
import {injectable, interfaces} from "inversify";
import * as classNames from "classnames"

import {IMenuBar} from "./IMenuBar"

import style from "Style.sass"

@injectable()
export class MenuBar extends React.Component<any, any> implements IMenuBar  {

    render() {
        return <header className={classNames(style.navbar, style.removeBoxShadow)}>
                    <div className={style.container}>
                        <div className={style.navbarStart}>
                            <a className={classNames(style.isPrimary, style.navbarItem)}>
                                <span className={classNames(style.icon, style.hvrSink, style.isSize2)}>
                                    <i className={classNames(style.fa, style.faGithubSquare)}></i>
                                </span>
                            </a>
                            <a className={classNames(style.isPrimary, style.navbarItem)}>
                                <span className={classNames(style.icon, style.hvrSink)}>
                                    <i className={classNames(style.fa, style.faLinkedinSquare, style.isSize2)}></i>
                                </span>
                            </a> 
                            <a className={classNames(style.isPrimary, style.navbarItem)}>
                                <span className={classNames(style.icon, style.hvrSink)}>
                                    <i className={classNames(style.fa, style.faTwitterSquare, style.isSize2)}></i>
                                </span>
                            </a>                                                                                        
                        </div>
                        <div className={classNames(style.navbarEnd)}>                   
                            <span className={classNames(style.navbarItem)}>
                                <p className={classNames(style.control, style.hasIconsLeft)}>
                                    <input className={classNames(style.input,style.isPrimary, style.isRounded)} type="text" placeholder="search"></input>
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