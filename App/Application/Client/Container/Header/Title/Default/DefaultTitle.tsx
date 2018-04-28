import * as React from "react";
import { injectable, interfaces } from "inversify";
import * as classNames from "classnames";

import { ITitle } from "2.Application/Client/Container/Header/Title/ITitle";
import { IDefaultTitle } from "2.Application/Client/Container/Header/Title/Default/IDefaultTitle";

import style from "Style.less"

@injectable()
export class DefaultTitle extends React.Component implements IDefaultTitle {

    render() {
        return <div className={classNames(style.hasTextCentered)}>
            <h1 className={classNames(style.title, style.isSize1)}>
                Some heading
            </h1>
            <h2 className={classNames(style.subtitle, style.isSize3)}>
                a sub heading..
            </h2>
        </div>
    }
}