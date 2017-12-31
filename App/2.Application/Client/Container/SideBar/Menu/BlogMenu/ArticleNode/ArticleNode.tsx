import * as React from "react";
import { observer } from "mobx-react";

import { injectable, interfaces } from "inversify";
import * as classNames from "classnames";

import style from "Style.sass";
import { IArticleNode, IArticleNodeProps } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/ArticleNode/IArticleNode";

@injectable()
@observer
export class ArticleNode extends React.Component<IArticleNodeProps> implements IArticleNode  {

    constructor(props:IArticleNodeProps) {
        super(props);
    }
    
    render() {
        console.log("rendering");
        const articleTree = this.props.articleTree;
        if(articleTree.children == null){
            // leaf node
            if(articleTree.article != null){
                return <li><a>{this.props.articleTree.article.title}</a></li>
            }
            return null;
        }
        let subtree = articleTree.children.map(function(child){
            return <ArticleNode key={child.name} articleTree={child} />;
        });

        if(articleTree.name == "Content"){
            return <ul>
                        {subtree}
                    </ul>
        }

        return  <li> 
                    <a>{articleTree.name}</a>
                    <ul>
                        {subtree}
                    </ul>
                </li>
    }
}