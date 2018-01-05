import * as React from "react";
import style from "Style.sass";
import { observer } from "mobx-react";
import { computed } from "mobx";
import { injectable, interfaces } from "inversify";
import {Treebeard} from "react-treebeard";
import * as classNames from "classnames";

import { IBlogMenu, IBlogMenuProps } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/IBlogMenu";
import { IArticleTreeServiceKey, IArticleTreeService, IArticleTree } from "2.Application/Common/Services/ArticleTree/IArticleTreeService";
import { IArticle } from "2.Application/Common/Domain/IArticle";
import { IBlogServiceKey, IBlogService } from "2.Application/Client/Lib/Services/Blog/IBlogService";

type node = {name:string, toggled?:boolean, article?:IArticle, active?:boolean, children?:node[]}

@injectable()
@observer
export class TreebeardBlogMenu extends React.Component<IBlogMenuProps, {cursor:node}> implements IBlogMenu  {

    @lazyInject(IArticleTreeServiceKey)
    public articleTreeService : IArticleTreeService;

    @lazyInject(IBlogServiceKey)
    public blogService : IBlogService;    

    constructor(props:IBlogMenuProps) {
        super(props);
        this.state = {cursor:null};
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node:node, toggled) {
        const {cursor} = this.state;
        if (cursor) {
            cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        if(node.article != null){
            this.blogService.updateSelectedArticle(node.article);
        }

        this.setState({cursor: node});
    }


    @computed
    private get menuData(){
        let tree = this.articleTreeService.articleTree;
        if(tree.children != null){ // skip root node
            return tree.children.map(el=>this.articleTreeToNodes(el));
        }
        return [];
    }

    private articleTreeToNodes(articleTree:IArticleTree):node{
        if(articleTree == null){
            return null;
        }
        if(articleTree.children == null){
            if(articleTree.article != null){
                return {name:articleTree.article.title, article:articleTree.article}
            }         
            return {name:articleTree.name}
        }else{
            let childNodes = articleTree.children.map(el=>this.articleTreeToNodes(el));
            return {name:articleTree.name, children:childNodes};
        }
    }
  
    render() {
        return <div>
                    <p className={classNames(style.menuLabel)} >
                        Articles
                    </p>
                    <Treebeard data={this.menuData} onToggle={this.onToggle}/>
                </div>
    }
}