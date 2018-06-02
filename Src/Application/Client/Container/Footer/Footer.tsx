import * as React from "react";
import {injectable} from "inversify";
import classNames from "classnames";

import {IFooter, IFooterKey} from "../../../_Parent/Client/Container/Footer/IFooter"

import style from "Theme/Style.less"

@injectable()
export class Footer extends React.Component implements IFooter  {
    render() {
        return <footer className={classNames('style.footer')}>
                    <div className={classNames('style.columns')}>
                        <div className={classNames('style.column', 'style.isOffsetOneQuarter', 'style.isThreeQuarters', 'style.hasTextCentered')}>
                            <p>
                                <strong>Blog</strong> by <a href="http://localhost">Antonie Coetzee</a>. The source code is licensed
                                <a href="http://localhost"> MIT</a>. The website content is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                            </p>
                        </div>
                    </div>
                </footer>
    }
}