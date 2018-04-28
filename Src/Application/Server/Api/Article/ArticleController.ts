import { injectable, inject, interfaces} from "inversify";
import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller } from 'tsoa';

import {IArticleController} from './IArticleController'
import { IArticle } from "../../../Common/Domain/IArticle";
import { IArticleServiceKey, IArticleService, IArticleTree } from "../../../Common/Services/Article/IArticleService";
import { ILoggerKey, ILogger } from "../../../_Parent/Common/Services/Logging/ILogger";

@injectable()
@Route('article')
export class ArticleController extends Controller implements IArticleController {
    
    constructor(
        @inject(ILoggerKey) private logger:ILogger,
        @inject(IArticleServiceKey) private articleService: IArticleService) {
        super();
    }

    @Get('tree')
    public async getTree(): Promise<IArticleTree> {
        this.logger.Debug("returning article tree");
        return this.articleService.GetArticleTree();    
    }

    @Get('full/{id}')
    public async getArticleWithSource(@Path('id') id:string): Promise<IArticle> {
        this.logger.Debug(`returning full article for id: ${id}`);
        return this.articleService.getArticleWithSource(id);       
    }    
}