import { injectable, inject} from "inversify";
import {Router} from "express";
import {IApiModule} from "./../IApiModule"

import {IConfig, IConfigKey} from "./../../config/IConfig"
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