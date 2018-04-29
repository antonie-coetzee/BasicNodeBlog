import * as React from "react";
import { observer } from "mobx-react";

import { injectable, interfaces } from "inversify";
import * as classNames from "classnames";

import { IArticleNode, IArticleNodeProps, IArticleNodeState } from "../../../../../../Client/Container/SideBar/Menu/BlogMenu/ArticleNode/IArticleNode";
import { IArticle } from "../../../../../../Common/Domain/IArticle";

import style from "Theme/Style.less";

@injectable()
@observer
export class ArticleNode extends React.Component<IArticleNodeProps, IArticleNodeState> implements IArticleNode  {
    private article:IArticle;
    
    constructor(props:IArticleNodeProps) {
        super(props);
        this.state = {isExpanded:false};
        this.expand = this.expand.bind(this);
        this.handleMenuDblClick = this.handleMenuDblClick.bind(this);
        this.handleArticleDblClick = this.handleArticleDblClick.bind(this);
    }

    expand(){
        if(this.props.expandParent){
            this.props.expandParent();
        }
        this.setState({isExpanded:false});
    }

    handleMenuDblClick(){
        let expanded = this.state.isExpanded;
        this.setState({isExpanded:!expanded})
    }

    handleArticleDblClick(){
        if(this.props.selectArticle){
            this.props.selectArticle(this.article);
        }
    }
    
    render() {
        const articleTree = this.props.articleTree;
        if(articleTree.children == null){
            if(articleTree.article != null){ //leaf node
                if(this.props.expandParent) ()=>{this.props.expandParent()}
                this.article = this.props.articleTree.article;
                let isActive = this.props.selectedArticleHash == this.props.articleTree.article.hash;
                return <li><a className={classNames({['style.isActive']: isActive})} onDoubleClick={this.handleArticleDblClick} onMouseDown={(e)=>e.preventDefault()} >
                            {this.props.articleTree.article.title}
                        </a></li>
            }
            return null;
        }
        let subtree = articleTree.children.map((child, idx)=>{
            return <ArticleNode 
                        key={idx} 
                        articleTree={child} 
                        selectedArticleHash={this.props.selectedArticleHash} 
                        expandParent={this.expand}
                        selectArticle={this.props.selectArticle}/>;
        });

        let listState = classNames({['style.isExpanded']: this.state.isExpanded}, {['style.isCollapsed']: !this.state.isExpanded});

        if(articleTree.name == "Content"){
            return <ul>
                        {subtree}
                    </ul>
        }

        return  <li> 
                    <a onDoubleClick={this.handleMenuDblClick} onMouseDown={(e)=>e.preventDefault()}>{articleTree.name}</a>
                    <ul className={listState}>
                        {subtree}
                    </ul>
                </li>
    }
}