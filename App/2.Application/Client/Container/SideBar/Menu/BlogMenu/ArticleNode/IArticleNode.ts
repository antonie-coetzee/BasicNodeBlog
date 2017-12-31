import * as React from "react";
import { IArticleTree } from "2.Application/Common/Services/ArticleTree/IArticleTreeService";

export interface IArticleNodeProps {
    articleTree:IArticleTree;
}

export interface IArticleNode extends React.Component<IArticleNodeProps> {}
export let IArticleNodeKey = "IArticleNodeKey";