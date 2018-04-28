import {injectable, inject} from "inversify";
import {observable, action, computed} from "mobx";
import { RouterStore } from "mobx-react-router";
import { Location } from "history";
import * as qs from "querystring";

import { IBlogService } from "../../../../Client/Lib/Services/Blog/IBlogService";
import { IArticle } from "../../../../Common/Domain/IArticle";

@injectable()
export class BlogService implements IBlogService  {  
    @observable
    selectedArticle:IArticle

    constructor(@inject(RouterStore) private routerStore: RouterStore) {     
    }

    @action   
    updateSelectedArticle(article: IArticle) {
        this.selectedArticle = article;
        let newLocation:Location = {
                hash:'',
                pathname:`/blog/${article.metaHeader.id}/${this.slugify(this.removeLastSegment(article.path))}`,
                state:article,
                search:''
            };
        this.routerStore.push(newLocation);
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