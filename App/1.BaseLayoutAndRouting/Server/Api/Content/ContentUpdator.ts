
import {injectable} from "inversify"
import { IContentUpdator } from "./IContentUpdator"
import * as Git from "simple-git/promise"
import * as fs from "fs"

@injectable()
export default class ContentUpdator implements IContentUpdator {

    async UpdateContent(repoPath: string, repoUrl: string): Promise<boolean> {        
        if (repoPath == null) {
            throw new TypeError("repoPath");
        }
        if (repoUrl == null) {
            throw new TypeError("repoUrl");
        }

        var exists = await this.filePathExists(repoPath);
        if (exists) {
            await Git().pull(repoPath);
            return true;
        } else {          
            await Git().clone(repoUrl, repoPath);
            return false;
        }
    }

    filePathExists(filePath) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.stat(filePath, (err, stats) => {
                if (err && err.code === 'ENOENT') {
                    return resolve(false);
                } else if (err) {
                    return reject(err);
                }
                if (stats.isFile() || stats.isDirectory()) {
                    return resolve(true);
                }
            });
        });
    }    
}