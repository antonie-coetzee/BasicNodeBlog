import * as React from "react";
import style from "Style.sass";
import { observer } from "mobx-react";
import { injectable, interfaces } from "inversify";
import * as classNames from "classnames";

import { ILoggerKey, ILogger } from "1.Framework/Common/Services/Logging/ILogger";
import { IBlogMenu, IBlogMenuProps } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/IBlogMenu";
import { IArticleTreeServiceKey, IArticleTreeService } from "2.Application/Common/Services/ArticleTree/IArticleTreeService";
import { IArticleNodeKey, IArticleNode } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/ArticleNode/IArticleNode";
import { IArticle } from "2.Application/Common/Domain/IArticle";
import { IBlogServiceKey, IBlogService } from "2.Application/Client/Lib/Services/Blog/IBlogService";

@injectable()
@observer
export class BlogMenu extends React.Component<IBlogMenuProps> implements IBlogMenu  {

    @lazyInject(ILoggerKey) private logger: ILogger

    @lazyInject(IArticleTreeServiceKey)
    public articleTreeService : IArticleTreeService;

    @lazyInject(IArticleNodeKey)
    public ArticleNode : interfaces.Newable<IArticleNode>;

    @lazyInject(IBlogServiceKey)
    public blogService : IBlogService;

    constructor(props:IBlogMenuProps) {
        super(props);
        this.selectArticle = this.selectArticle.bind(this);
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
                            articleTree={this.articleTreeService.articleTree} 
                            selectArticle={this.selectArticle} />
                    </ul>
                </div>
    }
}