import * as React from "react";
import { observer } from "mobx-react";
import { injectable, interfaces } from "inversify";
import * as classNames from "classnames";

import { ISideBar } from "1.Framework/Client/Container/SideBar/ISideBar"
import { ITagCloudKey, ITagCloud } from "2.Application/Client/Container/SideBar/TagCloud/ITagCloud";
import { IResponsiveServiceKey, IResponsiveService } from "1.Framework/Client/Lib/Responsive/IResponsiveService";
import { IArticleTreeServiceKey, IArticleTreeService } from "2.Application/Common/Services/ArticleTree/IArticleTreeService";
import { IAvatar, IAvatarKey } from "2.Application/Client/Container/SideBar/Avatar/IAvatar";
import { IMenuKey, IMenu } from "2.Application/Client/Container/SideBar/Menu/IMenu";

import style from "Style.sass"


const profile = require('./profile.jpg')

@observer
@injectable()
export class SideBar extends React.Component implements ISideBar  {

    @lazyInject(IResponsiveServiceKey)
    public ResponsiveService : IResponsiveService;

    @lazyInject(IArticleTreeServiceKey)
    public articleTreeService : IArticleTreeService;

    @lazyInject(IAvatarKey)
    public Avatar : interfaces.Newable<IAvatar>;

    @lazyInject(IMenuKey)
    public Menu : interfaces.Newable<IMenu>;

    @lazyInject(ITagCloudKey)
    public TagCloud : interfaces.Newable<ITagCloud>;    

    componentWillMount(){
      this.articleTreeService.GetArticleTree();
    }

    render() {
      return <aside className={style.menu}>         
                <this.Avatar imageSrc={profile} />    
                <hr/>
                <this.Menu />
                <hr/>
                {(this.ResponsiveService.IsTablet || this.ResponsiveService.IsDesktop) &&
                  <this.TagCloud maxTags={10} tagCloud={this.articleTreeService.tagCloud} />
                }             
              </aside>
    }
}