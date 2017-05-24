import {IMetaHeader} from "./../MetaHeader/IMetaHeader"

export interface IArticle {
    title:string;
    guid:string;
    dateCreated:Date;
    path:string;
    metaHeader:IMetaHeader;
    contents:string;
}