import * as React from "react";
import { withRouter, Switch, Route , RouteComponentProps} from "react-router";
import { observer } from "mobx-react";
import { injectable } from "inversify";

import { IBlogWrapperProps, IBlogWrapper } from "2.Application/Client/Container/Content/Blog/IBlogWrapper";

import style from "Style.sass"

@withRouter
@injectable()
export class BlogWrapper extends React.Component<IBlogWrapperProps & RouteComponentProps<IBlogWrapperProps>> implements IBlogWrapper {

    constructor(props: IBlogWrapperProps & RouteComponentProps<IBlogWrapperProps>) {
        super(props);
    }
    
    render() {
        return  <Switch>
                    <Route path={`${this.props.match.path}/search`} render={()=><p>searching..</p>} />
                    <Route path={`${this.props.match.path}/*`} render={()=><p>blog article</p>} />
                    <Route render={() => <p>content type not matched</p>} />
                </Switch>
    }
}