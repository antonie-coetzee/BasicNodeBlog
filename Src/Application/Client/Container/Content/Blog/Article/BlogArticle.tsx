import * as React from "react";
import { withRouter, Switch, Route , RouteComponentProps} from "react-router";
import { observer } from "mobx-react";
import { injectable } from "inversify";
import { lazyInject } from "../../../../../_Parent/_Parent/Common/AppContainer/LazyInject";
import * as classNames from "classnames";
import Markdown from "markdown-to-jsx";

import { IBlogArticleProps, IBlogArticle } from "../../../../../Client/Container/Content/Blog/Article/IBlogArticle";
import { IArticleServiceKey, IArticleService } from "../../../../../Common/Services/Article/IArticleService";

import style from "Theme/Style.less"
//import { CodeBlock } from "./Renders/CodeBlock";

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
        let article = this.articleService.articleWithSource;
        if(article.source == null){
            article.source = ""; 
        }
        return <div>
                    <h1 className={classNames('style.title')}>{article.title}</h1> 
                    <h5 className={classNames('style.subtitle', 'style.is6')}>{article.metaHeader && article.metaHeader.date} </h5>
                    {article.metaHeader && article.metaHeader.tags && 
                        <div className={classNames('style.tags')}>
                            {article.metaHeader.tags.map((tag, idx)=>{                           
                                return <span className={classNames('style.tag', 'style.isRounded')} key={idx}>
                                            {tag}
                                        </span>
                            })}
                        </div>
                    }
                    <hr/>
                    <div className={classNames('style.content')}>
                        <Markdown >
                            {article.source}
                        </Markdown>  
                    </div >
                </div>                                                        
    }
}