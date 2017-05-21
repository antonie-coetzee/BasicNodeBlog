import { injectable} from "inversify";
import {Router} from "express";
import {IApiModule} from "./../IApiModule"

@injectable()
export class ContentApi implements IApiModule {
    basePath:string = 'content/';
    constructor() {}
  
    ConfigureRouter(router:Router) : Router{

        router.get('/',  (req, res) => {
            res.send('Birds home page')
        })
    
        return router; 
    }
}