import {injectable, ContainerModule, interfaces, multiInject} from "inversify"

import {ISideBar, ISideBarKey} from "../../../_Parent/Client/Container/SideBar/ISideBar"
import { SideBar } from "../../../Client/Container/SideBar/SideBar";

import { IAvatarKey, IAvatar } from '../../../Client/Container/SideBar/Avatar/IAvatar';
import { Avatar } from '../../../Client/Container/SideBar/Avatar/Avatar';

import { IMenu, IMenuKey } from '../../../Client/Container/SideBar/Menu/IMenu';
import { Menu } from '../../../Client/Container/SideBar/Menu/Menu';

import { IBlogMenu, IBlogMenuKey } from '../../../Client/Container/SideBar/Menu/BlogMenu/IBlogMenu';
import { BlogMenu } from '../../../Client/Container/SideBar/Menu/BlogMenu/BlogMenu';

import { IArticleNode, IArticleNodeKey } from "../../../Client/Container/SideBar/Menu/BlogMenu/ArticleNode/IArticleNode";
import { ArticleNode } from "../../../Client/Container/SideBar/Menu/BlogMenu/ArticleNode/ArticleNode";

import { ITagCloud, ITagCloudKey } from "../../../Client/Container/SideBar/Menu/BlogMenu/TagCloud/ITagCloud";
import { TagCloud } from "../../../Client/Container/SideBar/Menu/BlogMenu/TagCloud/TagCloud";

export let SidebarModule = new ContainerModule(
    (bind: interfaces.Bind)=>{       
        bind<ISideBar>(ISideBarKey).toConstructor(SideBar);
        bind<ITagCloud>(ITagCloudKey).toConstructor(TagCloud);
        bind<IAvatar>(IAvatarKey).toConstructor(Avatar);
        bind<IMenu>(IMenuKey).toConstructor(Menu);
        bind<IArticleNode>(IArticleNodeKey).toConstructor(ArticleNode);          
    });