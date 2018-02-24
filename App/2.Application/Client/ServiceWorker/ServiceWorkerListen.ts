import { injectable, inject } from "inversify";
import { IServerListen } from "1.Framework/Common/Server/IServerListen";
import { ILoggerKey, ILogger } from "1.Framework/Common/Services/Logging/ILogger";
import { IExpressApplication } from "1.Framework/Server/Application/IExpressApplication";

import * as expressService from "1.Framework/Client/Lib/ServiceWorker/expressService"

@injectable()
export class ServiceWorkerListen implements IServerListen {

    constructor(@inject(ILoggerKey) private logger:ILogger) {}

    Listen(app: IExpressApplication) {

        var indexPage = [
            '<!DOCTYPE html>',
            '<html lang="en">',
            '<head>',
            '<meta charset="utf-8">',
            '</head>',
            '<body>',
            '<h1>Hello World</h1>',
            '<p>Served by Express framework</p>',
            '<p>read <a href="/about">about page</a></p>',
            '</body>',
            '</html>'
          ].join('\n')
          
          var aboutPage = [
            '<!DOCTYPE html>',
            '<html lang="en">',
            '<head>',
            '<meta charset="utf-8">',
            '</head>',
            '<body>',
            '<h1>About express-service</h1>',
            '<p>Served by Express framework</p>',
            '</body>',
            '</html>'
          ].join('\n')
          
          function sendIndexPage (req, res) {
            res.send(indexPage)
          }
          
          function sendAboutPage (req, res) {
            res.send(aboutPage)
          }
          
          app.instance.get('/', sendIndexPage)
          app.instance.get('/about', sendAboutPage)


        expressService(app.instance);
    }
}