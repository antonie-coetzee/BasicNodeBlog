import { injectable, inject} from "inversify";
import {Router} from "express";
import {IApiModule} from "./../IApiModule"

import {IConfig, IConfigKey} from "./../../config/IConfig"
import { IContentUpdator, IContentUpdatorKey } from "./IContentUpdator"

@injectable()
export class ContentApi implements IApiModule {
    basePath:string = 'content/';
    
    constructor(
        @inject(IContentUpdatorKey) private contentUpdator: IContentUpdator,
        @inject(IConfigKey) private config: IConfig
        ) {}
  
    ConfigureRouter(router:Router) : Router{
        router.get('/update',  async (req, res) => {
            await this.contentUpdator.UpdateContent("./dist/server/content", this.config.contentUrl);
            res.send('content updated..')
        })
    
        return router; 
    }
}