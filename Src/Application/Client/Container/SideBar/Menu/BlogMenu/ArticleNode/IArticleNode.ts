import * as React from "react";
import { IArticleTree } from "../../../../../../Common/Services/Article/IArticleService";
import { IArticle } from "../../../../../../Common/Domain/IArticle";

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