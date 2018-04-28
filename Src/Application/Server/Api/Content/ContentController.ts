import { injectable, inject, interfaces} from "inversify";
import {Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Controller } from 'tsoa';

import {IContentController} from './IContentController'
import { IArticle } from "../../../Common/Domain/IArticle";
import { IArticleServiceKey, IArticleService, IArticleTree } from "../../../Common/Services/Article/IArticleService";
import { ILoggerKey, ILogger } from "../../../_Parent/Common/Services/Logging/ILogger";
import { IContentServiceKey, IContentService } from "../../../Server/Lib/Services/Content/IContent";

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