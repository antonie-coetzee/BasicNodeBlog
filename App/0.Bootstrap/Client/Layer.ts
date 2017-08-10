import AppContainer from '../Common/AppContainer/AppContainer'
import getDecorators from "inversify-inject-decorators";

// setup layered container and property injector
import "./lazyInject.js"
declare var lazyInject: any;

let appContainer = new AppContainer();
lazyInject = getDecorators(appContainer.container).lazyInject;

export default appContainer;
