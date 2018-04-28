/* tslint:disable */
import { interfaces } from "inversify";
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { IArticleController, IArticleControllerKey } from './Article/IArticleController';
import { IContentController, IContentControllerKey } from './Content/IContentController';

const models: TsoaRoute.Models = {
    "IMetaHeader": {
        "properties": {
            "id": { "dataType": "string", "required": true },
            "title": { "dataType": "string" },
            "date": { "dataType": "string", "required": true },
            "synopsis": { "dataType": "string", "required": true },
            "readingTime": { "dataType": "string" },
            "tags": { "dataType": "array", "array": { "dataType": "string" } },
        },
    },
    "IArticle": {
        "properties": {
            "title": { "dataType": "string", "required": true },
            "path": { "dataType": "string", "required": true },
            "metaHeader": { "ref": "IMetaHeader", "required": true },
            "hash": { "dataType": "string", "required": true },
            "source": { "dataType": "string" },
        },
    },
    "IArticleTree": {
        "properties": {
            "name": { "dataType": "string", "required": true },
            "article": { "ref": "IArticle", "required": true },
            "children": { "dataType": "array", "array": { "ref": "IArticleTree" }, "required": true },
        },
    },
};

export function RegisterRoutes(app: any, iocContainer: interfaces.Container) {
    app.get('/api/v1/article/tree',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<IArticleController>(IArticleControllerKey);

            const promise = controller.getTree.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/article/full/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<IArticleController>(IArticleControllerKey);

            const promise = controller.getArticleWithSource.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/api/v1/content/update',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = iocContainer.get<IContentController>(IContentControllerKey);

            const promise = controller.doUpdate.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });


    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (controllerObj instanceof Controller) {
                    const controller = controllerObj as Controller
                    const headers = controller.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controller.getStatus();
                }

                if (data) {
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
