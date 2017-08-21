import { injectable, inject} from "inversify";
import {Router} from "express";
import {IApiModule} from "../../../../1.Framework/Server/Api/IApiModule"
import {ILogger, ILoggerKey} from "../../../../1.Framework/Common/Services/Logging/ILogger"
import {IConfig, IConfigKey} from "../../../../1.Framework/Server/Config/IConfig"
import {IContentRepository, IContentRepositoryKey} from "../../Lib/Content/Repository/IContentRepository"

@injectable()
export class ContentApi implements IApiModule {
    basePath:string = 'content/';
    
    constructor(
        @inject(IContentRepositoryKey) private contentRepository: IContentRepository,
        @inject(IConfigKey) private config: IConfig
        ) {}
  
    ConfigureRouter(router:Router) : Router{
        router.get('/update',  async (req, res) => {
            await this.contentRepository.SyncWithRepository(this.config.contentLocalPath, this.config.contentUrl);
            res.send('content updated..')
        })
    
        return router; 
    }
}