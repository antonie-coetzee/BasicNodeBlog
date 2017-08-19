
import {injectable} from "inversify"
import { IContentRepository } from "./IContentRepository"
import * as Git from "simple-git/promise"
import * as fs from "fs"

@injectable()
export default class ContentRepository implements IContentRepository{

    async SyncWithRepository(localPath: string, repoUrl: string, branch:string = "master"): Promise<boolean> {        
        if (localPath == null) {
            throw new TypeError("localPath");
        }
        if (repoUrl == null) {
            throw new TypeError("repoUrl");
        }

        var exists = await this.filePathExists(localPath);
        if (exists) {
            await Git().pull(localPath)
            Git(localPath).checkout(branch);
            return true;
        } else {          
            await Git().clone(repoUrl, localPath);
            Git(localPath).checkout(branch);
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