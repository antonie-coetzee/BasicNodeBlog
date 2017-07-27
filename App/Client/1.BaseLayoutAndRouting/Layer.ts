import AppContainer from 'Common/AppContainer/AppContainer'
import {injectable, inject, interfaces} from "inversify";
import getDecorators from "inversify-inject-decorators";

// setup layered container and property injector
let appContainer = new AppContainer();
import "./lazyInject.js"
declare var lazyInject: any;
lazyInject = getDecorators(appContainer.container).lazyInject;

import {IApplication, IApplicationKey} from "Client/Contracts/Layout/IApplication"
import {Application} from "./Application"

import {IHeader, IHeaderKey} from "Client/Contracts/Layout/IHeader"
import {Header} from "./Header"

appContainer.AddLayer((container)=>{
    container.bind<IApplication>(IApplicationKey).toConstructor(Application);
    container.bind<IHeader>(IHeaderKey).toConstructor(Header);
})

export default appContainer;
