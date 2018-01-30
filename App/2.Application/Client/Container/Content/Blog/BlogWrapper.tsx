import * as React from "react";
import { withRouter, Switch, Route, RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import { injectable, interfaces } from "inversify";
import { lazyInject } from "0.Bootstrap/Common/AppContainer/LazyInject";

import { IBlogWrapperProps, IBlogWrapper } from "2.Application/Client/Container/Content/Blog/IBlogWrapper";
import { IBlogArticleKey, IBlogArticle } from "2.Application/Client/Container/Content/Blog/Article/IBlogArticle";

import style from "Style.sass"


@withRouter
@injectable()
export class BlogWrapper extends React.Component<IBlogWrapperProps & RouteComponentProps<IBlogWrapperProps>> implements IBlogWrapper {

    @lazyInject(IBlogArticleKey)
    public BlogArticle: interfaces.Newable<IBlogArticle>;

    constructor(props: IBlogWrapperProps & RouteComponentProps<IBlogWrapperProps>) {
        super(props);
    }

    render() {
        return <Switch>
            <Route path={`${this.props.match.path}/search`} render={() => <p>searching..</p>} />
            <Route path={`${this.props.match.path}/:id/*`}
                render={
                    (props) => {
                        return <this.BlogArticle shortId={props.match.params['id']} />
                    }
                } />
            <Route render={() => <p>content type not matched</p>} />
        </Switch>
    }
}