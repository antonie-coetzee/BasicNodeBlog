import AppContainer from 'Common/AppContainer/AppContainer'
import {injectable, inject, interfaces} from "inversify";
import getDecorators from "inversify-inject-decorators";

// setup layered container
let appContainer = new AppContainer();
import "./lazyInject.js"
declare var lazyInject: any;
lazyInject = getDecorators(appContainer.container).lazyInject;

import {IApplication, IApplicationKey} from "Client/Contracts/IApplication"
import {Application} from "./Application"

import {ISearchBar, ISearchBarKey} from "Client/Contracts/ISearchBar"
import {SearchBarEmpty} from "./SearchBar"

appContainer.Add((container)=>{
    container.bind<ISearchBar>(ISearchBarKey).toConstructor(SearchBarEmpty);
    container.bind<IApplication>(IApplicationKey).toConstructor(Application);
})

export default appContainer;
