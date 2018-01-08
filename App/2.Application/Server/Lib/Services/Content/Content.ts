import { injectable, inject } from "inversify";
import { IContentService } from "./IContent";
import { IConfigKey, IConfig } from "1.Framework/Server/Config/IConfig";
import { ILoggerKey, ILogger } from "1.Framework/Common/Services/Logging/ILogger";

import * as Git from "nodegit";

@injectable()
export class ContentService implements IContentService {
    constructor(
        @inject(IConfigKey) private config: IConfig,
        @inject(ILoggerKey) private logger: ILogger) { }


    public async Update():Promise<any>{
        await this.Clone(this.config.contentUrl, this.config.contentLocalPath)
        return;
    }    

    private async Clone(url:string, contentPath:string):Promise<boolean>{
        let repo = await Git.Clone(url, contentPath)
        return true;
    }
}