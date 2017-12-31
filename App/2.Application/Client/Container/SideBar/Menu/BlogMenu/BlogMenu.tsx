import * as React from "react";
import style from "Style.sass";
import { observer } from "mobx-react";
import { injectable, interfaces } from "inversify";
import * as classNames from "classnames";

import { IBlogMenu, IBlogMenuProps } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/IBlogMenu";
import { IArticleTreeServiceKey, IArticleTreeService } from "2.Application/Common/Services/ArticleTree/IArticleTreeService";
import { IArticleNodeKey, IArticleNode } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/ArticleNode/IArticleNode";


@injectable()
@observer
export class BlogMenu extends React.Component<IBlogMenuProps> implements IBlogMenu  {

    @lazyInject(IArticleTreeServiceKey)
    public articleTreeService : IArticleTreeService;

    @lazyInject(IArticleNodeKey)
    public ArticleNode : interfaces.Newable<IArticleNode>;

    constructor(props:IBlogMenuProps) {
        super(props);
    }
    
    render() {
        return <div>
                    <p className={classNames(style.menuLabel)} >
                        Articles
                    </p>
                    <ul className={classNames(style.menuList)} >
                        <this.ArticleNode articleTree={this.articleTreeService.articleTree} />
                    </ul>
                </div>
    }
}