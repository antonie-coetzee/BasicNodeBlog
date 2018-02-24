import 'es6-map/implement'
import '1.Framework/Client/Lib/ServiceWorker/expressjsPatch'

import layer from "./Layer"
import {IServerApplication, IServerApplicationKey} from "0.Bootstrap/Common/Application/IServerApplication"

layer.Initialize();

let server = layer.container.get<IServerApplication>(IServerApplicationKey);
server.Bootstrap();