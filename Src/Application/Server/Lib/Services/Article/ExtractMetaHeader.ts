import { IMetaHeader } from "../../../../Common/Domain/IMetaHeader";

export class ExtractMetaHeader{
    public static Extract(fileData:string):IMetaHeader{
        if(fileData == null){
            throw new TypeError("fileData");
        }
        let matchResult = fileData.match(/<!-- meta([\s\S]*?)-->/);
        if(matchResult == null){
            throw new Error("meta header not present");
        }
        let metaHeaderJson = JSON.parse(matchResult[1]);
        metaHeaderJson.tags = metaHeaderJson.tags.split(" ");
        return metaHeaderJson as IMetaHeader;
    }
}