import * as React from "react";

import { observer } from "mobx-react";
import { injectable, interfaces } from "inversify";
import classNames from "classnames";
import { lazyInject } from "../../../../../_Parent/_Parent/Common/AppContainer/LazyInject";

import { ILoggerKey, ILogger } from "../../../../../_Parent/Common/Services/Logging/ILogger";
import { IBlogMenu, IBlogMenuProps } from "../../../../../Client/Container/SideBar/Menu/BlogMenu/IBlogMenu";
import { IArticleServiceKey, IArticleService } from "../../../../../Common/Services/Article/IArticleService";
import { IArticleNodeKey, IArticleNode } from "../../../../../Client/Container/SideBar/Menu/BlogMenu/ArticleNode/IArticleNode";
import { IArticle } from "../../../../../Common/Domain/IArticle";
import { IBlogServiceKey, IBlogService } from "../../../../../Client/Lib/Services/Blog/IBlogService";
import { IResponsiveServiceKey, IResponsiveService } from "../../../../../_Parent/Client/Lib/Responsive/IResponsiveService";
import { ITagCloudKey, ITagCloud } from "../../../../../Client/Container/SideBar/Menu/BlogMenu/TagCloud/ITagCloud";

import style from "Theme/Style.less";

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
                    <p className={classNames('style.menuLabel')} >
                        Articles
                    </p>
                    <ul className={classNames('style.menuList')} >
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