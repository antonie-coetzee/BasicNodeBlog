import * as React from "react";
import { withRouter, Switch, Route, RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import { injectable, interfaces } from "inversify";
import { lazyInject } from "../../../../_Parent/_Parent/Common/AppContainer/LazyInject";

import { IBlogContentProps, IBlogContent } from "../../../../Client/Container/Content/Blog/IBlogContent";
import { IBlogArticleKey, IBlogArticle } from "../../../../Client/Container/Content/Blog/Article/IBlogArticle";

import style from "Theme/Style.less"

@injectable()
export class BlogContent extends React.Component<IBlogContentProps & RouteComponentProps<IBlogContentProps>> implements IBlogContent {

    @lazyInject(IBlogArticleKey)
    public BlogArticle: interfaces.Newable<IBlogArticle>;

    constructor(props: IBlogContentProps & RouteComponentProps<IBlogContentProps>) {
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