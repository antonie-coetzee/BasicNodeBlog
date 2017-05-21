import { injectable, inject} from "inversify";
import {Router} from "express";
import {IApiModule} from "./../IApiModule"

import { IContentUpdator, IContentUpdatorKey } from "./IContentUpdator"

@injectable()
export class ContentApi implements IApiModule {
    basePath:string = 'content/';
    
    constructor(@inject(IContentUpdatorKey) private contentUpdator: IContentUpdator) {}
  
    ConfigureRouter(router:Router) : Router{
        router.get('/update',  async (req, res) => {
            await this.contentUpdator.UpdateContent("./dist/content", "https://github.com/WireJunky/BlogContent.git");
            res.send('content updated..')
        })
    
        return router; 
    }
}