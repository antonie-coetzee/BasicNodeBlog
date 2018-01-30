import * as React from "react";
import style from "Style.sass";
import { observer } from "mobx-react";
import { injectable, interfaces } from "inversify";
import * as classNames from "classnames";
import { lazyInject } from "0.Bootstrap/Common/AppContainer/LazyInject";

import { ILoggerKey, ILogger } from "1.Framework/Common/Services/Logging/ILogger";
import { IBlogMenu, IBlogMenuProps } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/IBlogMenu";
import { IArticleServiceKey, IArticleService } from "2.Application/Common/Services/Article/IArticleService";
import { IArticleNodeKey, IArticleNode } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/ArticleNode/IArticleNode";
import { IArticle } from "2.Application/Common/Domain/IArticle";
import { IBlogServiceKey, IBlogService } from "2.Application/Client/Lib/Services/Blog/IBlogService";
import { IResponsiveServiceKey, IResponsiveService } from "1.Framework/Client/Lib/Responsive/IResponsiveService";
import { ITagCloudKey, ITagCloud } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/TagCloud/ITagCloud";


@injectable()
@observer
export class BlogMenu extends React.Component<IBlogMenuProps> implements IBlogMenu  {

    @lazyInject(ILoggerKey) private logger: ILogger

    @lazyInject(IResponsiveServiceKey)
    public ResponsiveService : IResponsiveService;

    @lazyInject(ITagCloudKey)
    public TagCloud : interfaces.Newable<ITagCloud>;    

    @lazyInject(IArticleServiceKey)
    public articleService : IArticleService;

    @lazyInject(IArticleNodeKey)
    public ArticleNode : interfaces.Newable<IArticleNode>;

    @lazyInject(IBlogServiceKey)
    public blogService : IBlogService;

    constructor(props:IBlogMenuProps) {
        super(props);
        this.selectArticle = this.selectArticle.bind(this);
    }

    async componentDidMount(){
        try {
          await this.articleService.GetArticleTree();
        } catch (error) {
          console.error(error);
        }   
      }

    selectArticle(article:IArticle){
        this.logger.Debug(`selected article: ${article.title}`);
        this.blogService.updateSelectedArticle(article);
    }
    
    render() {
        return <div>
                    <p className={classNames(style.menuLabel)} >
                        Articles
                    </p>
                    <ul className={classNames(style.menuList)} >
                        <this.ArticleNode 
                            articleTree={this.articleService.articleTree} 
                            selectArticle={this.selectArticle} />
                    </ul>
                    <hr/>
                    {(this.ResponsiveService.IsTablet || this.ResponsiveService.IsDesktop) &&
                        <this.TagCloud maxTags={10} tagCloud={this.articleService.tagCloud} />
                    }                        
                </div>
    }
}