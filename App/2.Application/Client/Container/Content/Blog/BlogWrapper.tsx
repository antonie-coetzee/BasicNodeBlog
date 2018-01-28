import * as React from "react";
import { observer } from "mobx-react";
import {injectable} from "inversify";

import { IBlogWrapperProps, IBlogWrapper } from "2.Application/Client/Container/Content/Blog/IBlogWrapper";

import style from "Style.sass"

@injectable()
export class BlogWrapper extends React.Component<IBlogWrapperProps> implements IBlogWrapper  {
    render() {
        return <p>Hallo!</p>
    }
}