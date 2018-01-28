import * as React from "react";
import { IArticleTree } from "2.Application/Common/Services/ArticleTree/IArticleTreeService";
import { IArticle } from "2.Application/Common/Domain/IArticle";

export interface IArticleNodeState {
    isExpanded:boolean;
}

export interface IArticleNodeProps {
    articleTree:IArticleTree;
    selectedArticleHash?:string;
    expandParent?:()=>void;
    selectArticle?:(article:IArticle)=>void;
}

export interface IArticleNode extends React.Component<IArticleNodeProps, IArticleNodeState> {}
export let IArticleNodeKey = "IArticleNodeKey";