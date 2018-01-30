import * as React from "react";
import { withRouter, Switch, Route , RouteComponentProps} from "react-router";
import { observer } from "mobx-react";
import { injectable } from "inversify";
import { lazyInject } from "0.Bootstrap/Common/AppContainer/LazyInject";

import { IBlogArticleProps, IBlogArticle } from "2.Application/Client/Container/Content/Blog/Article/IBlogArticle";
import { IArticleServiceKey, IArticleService } from "2.Application/Common/Services/Article/IArticleService";

import style from "Style.sass"


@observer
@injectable()
export class BlogArticle extends React.Component<IBlogArticleProps> implements IBlogArticle {

    @lazyInject(IArticleServiceKey)
    public articleService : IArticleService;

    constructor(props: IBlogArticleProps) {
        super(props);
    }

    componentDidMount(){
        this.articleService.getArticleWithSource(this.props.shortId);    
    }

    componentWillReceiveProps(nextProps:IBlogArticleProps){
        if(this.props.shortId !== nextProps.shortId){
            this.articleService.getArticleWithSource(nextProps.shortId);
        }
    }
  
    render() {      
        return <p>{this.articleService.articleWithSource.title}</p>;
    }
}