import {IContentReader} from "./IContentReader"
import * as fs from "fs"
import * as pathLib from "path"

(Symbol as any).asyncIterator = Symbol.asyncIterator || "__@@asyncIterator__";

export class ContentReader implements IContentReader {
    async *read(path:string) : AsyncIterableIterator<string>{

        yield* this.itterateDirectory(fileType.Directory, path);
    }

    async *itterateDirectory(filter:fileType, path:string) : AsyncIterableIterator<string>{
        let items = await this.readDirectory(filter, path);
        yield* items
    }

    readDirectory(filter:fileType, path) : Promise<string[]> {
        return new Promise((resolve, reject) => {
            fs.readdir(path, async (err, files) => {
                let contents:string[] = [];
                for(let file of files){
                    if (err) {
                        return reject(err);
                    }
                    let filePath = path + file;
                    let stats:fs.Stats = null;
                    try{
                        stats = await this.fileStat(filePath);
                    }
                    catch(err){
                        reject(err);
                    }                
                    if (filter == fileType.Directory && stats.isDirectory()) {
                        contents.push(filePath);
                    }
                    if (filter == fileType.File && stats.isFile()) {
                        contents.push(filePath);
                    }                    
                }
                resolve(contents);
            });
        });
    }   

    fileStat(path) : Promise<fs.Stats> {
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, stats) => {
                if (err) {
                    return reject(err);
                }     
                return resolve(stats);
            });
        });
    }           
}

enum fileType {
    Directory,
    File
}   