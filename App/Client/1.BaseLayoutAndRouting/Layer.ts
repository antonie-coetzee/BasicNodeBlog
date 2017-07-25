import LayeredContainer from 'Common/Container/LayeredContainer'

import {IApplication, IApplicationKey} from "Client/Contracts/IApplication"
import {Application} from "./Application"

let layeredContainer = new LayeredContainer();

layeredContainer.AddLayer((childContainer)=>{
    childContainer.bind<IApplication>(IApplicationKey).toConstructor(Application);
})

export default layeredContainer;