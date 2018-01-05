import { injectable, inject } from "inversify";
import { action, observable, computed, runInAction} from "mobx";

import { IArticleTreeService, IArticleTree } from "../../../../Common/Services/ArticleTree/IArticleTreeService"
import { IMetaHeader } from "../../../../Common/Domain/IMetaHeader"
import { IArticle } from "../../../../Common/Domain/IArticle"
import { ILogger, ILoggerKey } from "1.Framework/Common/Services/Logging/ILogger"
import { ApiWrapperKey, ApiWrapper } from "../../Api/ApiWrapper";
import { observer } from "mobx-react";

@injectable()
export class ArticleTreeService implements IArticleTreeService {
    @observable
    public articleTree:IArticleTree;

    constructor(@inject(ILoggerKey) private logger: ILogger,
                @inject(ApiWrapperKey) private apiWrapper: ApiWrapper) {
                    this.articleTree = {name:"loading", article:null, children:null};
    }

    @action
    public async GetArticleTree(): Promise<IArticleTree> {
        this.logger.Debug("fetching article tree");
        let tree = await this.apiWrapper.Api.getTree();
        runInAction(()=>{
            this.logger.Debug("article tree fetched, updating");
            this.articleTree = tree;
        });
        return tree;
    }

    @computed
    get tagCloud(): Map<string,number>{
        let map:Map<string,number> = new Map();
        this.traverseForTags(map, this.articleTree);
        return map;
    }

    traverseForTags(map:Map<string,number>, tree:IArticleTree):Map<string,number>{
        if(tree == null){
            return map;
        }
        let tags = tree.article && tree.article.metaHeader && tree.article.metaHeader.tags || null
        if(tags != null){
            let tags = tree.article.metaHeader.tags;
            tags.forEach(element => {
                if(map.has(element)){
                    map.set(element, map.get(element) + 1); 
                }else{
                    map.set(element, 1);
                }
            });
        }
        if(tree.children == null){
            return map;
        }
        tree.children.forEach(element => {
            this.traverseForTags(map, element);
        });
        return map;
    }
}