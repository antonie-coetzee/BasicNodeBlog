import {IMetaHeader} from "./IMetaHeader"

export interface IArticle {
    title:string;
    guid:string;
    dateCreated:Date;
    path:string;
    metaHeader:IMetaHeader;
    contents:string;
}