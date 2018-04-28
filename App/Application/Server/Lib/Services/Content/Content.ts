import { injectable, inject } from "inversify";
import { IContentService } from "./IContent";
import { IConfigKey, IConfig } from "1.Framework/Server/Config/IConfig";
import { ILoggerKey, ILogger } from "1.Framework/Common/Services/Logging/ILogger";
import * as fs from "fs"
import * as Git from "nodegit";

@injectable()
export class ContentService implements IContentService {
    constructor(
        @inject(IConfigKey) private config: IConfig,
        @inject(ILoggerKey) private logger: ILogger) { }


    public async Update():Promise<any>{
        this.logger.Debug(`Checking if clone or pull is required for content path: '${this.config.contentLocalPath}'`);
        if(fs.existsSync(this.config.contentLocalPath)){
            await this.Fetch(this.config.contentUrl, this.config.contentLocalPath);
        }else{
            await this.Clone(this.config.contentUrl, this.config.contentLocalPath)
        }        
        return;
    }    

    private async Clone(url:string, contentPath:string):Promise<boolean>{
        this.logger.Debug(`Cloning content from url: '${url}' into directory: '${contentPath}'`)
        let repo = await Git.Clone(url, contentPath)
        return true;
    }

    private async Fetch(url:string, contentPath:string):Promise<boolean>{
        this.logger.Debug(`Pulling git repo at: '${contentPath}'`)
        let repository:Repository;
        return Git.Repository
            .open(contentPath)
            .then(repo=>{
                repository = repo;
                this.logger.Debug('Fetching all commits');
                return repo.fetchAll();
            })
            .then(()=>{
                this.logger.Debug('Merging into local master branch');
                return repository.mergeBranches("master", "origin/master");
            })
            .then(()=>{
                return true;
            })
    }
}