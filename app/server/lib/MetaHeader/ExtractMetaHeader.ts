import {IMetaHeader} from "./IMetaHeader"

export default class ExtractMetaHeader{
    static Extract(fileData:string):IMetaHeader{
        if(fileData == null){
            throw new TypeError("fileData");
        }
        let matchResult = fileData.match(/<!-- meta([\s\S]*?)-->/);
        if(matchResult.length == 0){
            throw new Error("meta header not present");
        }
        let metaHeaderJson = JSON.parse(matchResult[1]);
        return metaHeaderJson as IMetaHeader;
    }
}