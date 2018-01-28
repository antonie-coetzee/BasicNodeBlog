import {injectable, inject} from "inversify";
import {observable, action, computed} from "mobx";
import { IBlogService } from "2.Application/Client/Lib/Services/Blog/IBlogService";
import { IArticle } from "2.Application/Common/Domain/IArticle";
import { RouterStore } from "mobx-react-router";

@injectable()
export class BlogService implements IBlogService  {  
    @observable
    selectedArticle:IArticle

    constructor(@inject(RouterStore) private routerStore: RouterStore) {     
    }

    @action   
    updateSelectedArticle(article: IArticle) {
        this.selectedArticle = article;
        this.routerStore.push(`/blog/${this.slugify(this.removeLastSegment(article.path))}`, article);
    }

    removeLastSegment(text:string){
        var to = text.lastIndexOf('/');
        return text.substr(0,to);
    }

    slugify(text:string){
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/&/g, '-and-')         // Replace & with 'and'
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
}