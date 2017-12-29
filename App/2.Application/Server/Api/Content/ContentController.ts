import { injectable, inject, interfaces} from "inversify";
import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller } from 'tsoa';

import {IContentController} from './IContentController'
import { IArticle } from "2.Application/Common/Domain/IArticle";
import { IArticleTreeServiceKey, IArticleTreeService, IArticleTree } from "2.Application/Common/Services/ArticleTree/IArticleTreeService";
import { ILoggerKey, ILogger } from "1.Framework/Common/Services/Logging/ILogger";
import { IContentServiceKey, IContentService } from "2.Application/Server/Lib/Services/Content/IContent";

@injectable()
@Route('content')
export class ContentController extends Controller implements IContentController {
    
    constructor(
        @inject(ILoggerKey) private logger:ILogger,
        @inject(IContentServiceKey) private contentService: IContentService) {
        super();
    }

    @Get('update')
    public async doUpdate():Promise<any>{
        await this.contentService.Update();
        return false;
    }

}