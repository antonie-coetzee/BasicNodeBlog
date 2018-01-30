import {IMetaHeader} from "./IMetaHeader"

export interface IArticle {
    title:string;
    path:string;
    metaHeader:IMetaHeader;
    hash:string;
    shortId:string;
    source?:string;
}