import * as React from "react";
import {Link} from 'react-router-dom'
import {injectable, interfaces} from "inversify";
import * as classNames from "classnames"

import {ISideBarService, ISideBarServiceKey} from "../Container/SideBar/ISideBarService"
import {IHeader} from "../../../1.Framework/Client/Header/IHeader"

import style from "../../../1.Framework/Client/Style/Style.sass"

@injectable()
export class Header extends React.Component<any, any> implements IHeader  {

    @lazyInject(ISideBarServiceKey)
    private sideBarService : ISideBarService;

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return<section className="hero">        
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                  Basic Node Blog
                </h1>
                <h2 className="subtitle">
                  a simple blogging platform
                </h2>
              </div>
            </div>
        </section>
    }
}