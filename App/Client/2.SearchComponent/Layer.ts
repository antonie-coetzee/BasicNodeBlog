import appContainer from 'client/1.BaseLayoutAndRouting/Layer'
import {injectable, inject, interfaces} from "inversify";

import {ISearchBar, ISearchBarKey} from "Client/Contracts/ISearchBar"
import {SearchBar} from "./SearchBar"

appContainer.Add((container)=>{
    container.bind<ISearchBar>(ISearchBarKey).toConstructor(SearchBar).whenTargetIsDefault();
})

export default appContainer;
