import * as React from "react";
import { observer } from "mobx-react";

import { injectable, interfaces } from "inversify";
import * as classNames from "classnames";

import style from "Style.sass";
import { IArticleNode, IArticleNodeProps, IArticleNodeState } from "2.Application/Client/Container/SideBar/Menu/BlogMenu/ArticleNode/IArticleNode";

@injectable()
@observer
export class ArticleNode extends React.Component<IArticleNodeProps, IArticleNodeState> implements IArticleNode  {
    constructor(props:IArticleNodeProps) {
        super(props);
        this.state = {isExpanded:false};
        this.expand = this.expand.bind(this);
        this.handleDblClick = this.handleDblClick.bind(this);
    }

    expand(){
        if(this.props.expandParent){
            this.props.expandParent();
        }
        this.setState({isExpanded:false});
    }

    handleDblClick(){
        let expanded = this.state.isExpanded;
        this.setState({isExpanded:!expanded})
    }
    
    render() {
        const articleTree = this.props.articleTree;
        if(articleTree.children == null){
            if(articleTree.article != null){ //leaf node
                if(this.props.expandParent) this.props.expandParent();
                let isActive = this.props.selectedArticleHash == this.props.articleTree.article.hash;
                return <li><a className={classNames({[style.isActive]: isActive})}>
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
                        expandParent={this.expand}/>;
        });

        let listState = classNames({[style.isExpanded]: this.state.isExpanded}, {[style.isCollapsed]: !this.state.isExpanded});

        if(articleTree.name == "Content"){
            return <ul>
                        {subtree}
                    </ul>
        }

        return  <li> 
                    <a onDoubleClick={this.handleDblClick}>{articleTree.name}</a>
                    <ul className={listState}>
                        {subtree}
                    </ul>
                </li>
    }
}