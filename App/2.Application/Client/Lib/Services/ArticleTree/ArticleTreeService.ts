import { injectable, inject } from "inversify";

import { IArticleTreeService, IArticleTree } from "../../../../Common/Services/ArticleTree/IArticleTreeService"
import { IMetaHeader } from "../../../../Common/Domain/IMetaHeader"
import { IArticle } from "../../../../Common/Domain/IArticle"
import { ILogger, ILoggerKey } from "../../../../../1.Framework/Common/Services/Logging/ILogger"
import { ApiWrapperKey, ApiWrapper } from "../../Api/ApiWrapper";

@injectable()
export class ArticleTreeService implements IArticleTreeService {

    constructor(@inject(ILoggerKey) private logger: ILogger,
                @inject(ApiWrapperKey) private apiWrapper: ApiWrapper) { }

    public GetArticleTree(): Promise<IArticleTree> {
        this.logger.Debug("fetching article tree");
        return this.apiWrapper.Api.getTree();
    }
}