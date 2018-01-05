import {injectable} from "inversify";
import {observable, action, computed} from "mobx";
import { IBlogService } from "2.Application/Client/Lib/Services/Blog/IBlogService";
import { IArticle } from "2.Application/Common/Domain/IArticle";

@injectable()
export class BlogService implements IBlogService  {  
    @observable
    selectedArticle:IArticle

    @action   
    updateSelectedArticle(article: IArticle) {
        this.selectedArticle = article;
    }
}