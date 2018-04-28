import { injectable, inject } from "inversify";
import { action, observable, computed, runInAction} from "mobx";

import { IArticleService, IArticleTree } from "2.Application/Common/Services/Article/IArticleService"
import { IMetaHeader } from "../../../../Common/Domain/IMetaHeader"
import { IArticle } from "../../../../Common/Domain/IArticle"
import { ILogger, ILoggerKey } from "1.Framework/Common/Services/Logging/ILogger"
import { ApiWrapperKey, ApiWrapper } from "../../Api/ApiWrapper";
import { observer } from "mobx-react";

@injectable()
export class ArticleService implements IArticleService {
    @observable
    public articleTree:IArticleTree;

    @observable
    public articleWithSource:IArticle = <IArticle>{}

    constructor(@inject(ILoggerKey) private logger: ILogger,
                @inject(ApiWrapperKey) private apiWrapper: ApiWrapper) {
        this.articleTree = {name:"loading", article:null, children:null};
    }

    @action("fetching article tree")
    public async GetArticleTree(): Promise<IArticleTree> {
        this.logger.Debug("fetching article tree");
        let tree:IArticleTree = null;
        try {
            tree = await this.apiWrapper.Api.getTree();
            runInAction(()=>{
                this.logger.Debug("article tree fetched, updating");
                this.articleTree = tree;
            });
        } catch (error) {
            throw new Error(error);
        }

        return tree;
    }

    @action('fetching article with source')   
    async getArticleWithSource(id: string): Promise<IArticle> {
        this.logger.Debug(`fetching article with source shortid:${id}`);
        let article = await this.apiWrapper.Api.getArticleWithSource({id:id});
        runInAction(()=>{
            this.logger.Debug(`article: ${article.metaHeader.id}, with source fetched, updating`);
            this.articleWithSource = article;
        });
        return article;
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