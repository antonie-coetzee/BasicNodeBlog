import { injectable, inject, interfaces} from "inversify";
import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller } from 'tsoa';

import {IArticleController} from './IArticleController'
import { IArticle } from "2.Application/Common/Domain/IArticle";
import { IArticleTreeServiceKey, IArticleTreeService, IArticleTree } from "../../../../2.Application/Common/Services/ArticleTree/IArticleTreeService";
import { ILoggerKey, ILogger } from "1.Framework/Common/Services/Logging/ILogger";

@injectable()
@Route('article')
export class ArticleController extends Controller implements IArticleController {
    
    constructor(
        @inject(ILoggerKey) private logger:ILogger,
        @inject(IArticleTreeServiceKey) private articleTreeService: IArticleTreeService) {
        super();
    }

    @Get('tree')
    public async getTree(): Promise<IArticleTree> {
        this.logger.Debug("returning article tree");
        return this.articleTreeService.GetArticleTree();
    }
}