import {IMetaHeader} from "../../../../Common/Domain/IMetaHeader"
import {IArticle} from "../../../../Common/Domain/IArticle"

export class Article implements IArticle {
    public title:string;
    public path:string;
    public metaHeader:IMetaHeader;
    public hash:string;
    public shortId:string;
}