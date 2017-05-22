import {IMetaHeader} from "./../MetaHeader/IMetaHeader"

export interface IArticle {
    title:string;
    guid:string;
    dateCreated:Date;
    metaHeader:IMetaHeader;
}