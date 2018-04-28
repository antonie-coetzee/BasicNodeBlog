import * as React from "react";

export interface IBlogArticleProps {
    shortId:string;
}

export interface IBlogArticle extends React.Component<IBlogArticleProps> {}
export let IBlogArticleKey = "IBlogArticleKey";