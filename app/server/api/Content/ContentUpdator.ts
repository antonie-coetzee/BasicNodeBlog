
import {injectable} from "inversify"
import { IContentUpdator } from "./IContentUpdator"
import * as Git from "nodegit"
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
            await this.PullRepo(repoPath);
            return true;
        } else {          
            await this.CloneRepo(repoPath, repoUrl);
            return false;
        }
    }

    async CloneRepo(repoPath: string, repoUrl: string) {
        await Git.Clone(repoUrl, repoPath);
    }

    async PullRepo(repoPath: string) {
        var repository;
        await Git.Repository.open(repoPath)
            .then(function (repo) {
                repository = repo;
                return repo.fetchAll();
            })
            .then(function () {
                repository.mergeBranches("master", "origin/master");
            });
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