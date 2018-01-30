import AppContainer from '../Common/AppContainer/AppContainer'
import getDecorators from "inversify-inject-decorators";

// setup layered container and property injector
import "./lazyInject.js"
declare var lazyInject: any;
declare var lazyInjectNamed: any;
declare var lazyMultiInject: any;

let appContainer = new AppContainer();
lazyInject = getDecorators(appContainer.container).lazyInject;
lazyInjectNamed = getDecorators(appContainer.container).lazyInjectNamed;
lazyMultiInject = getDecorators(appContainer.container).lazyMultiInject;

export default appContainer;
