export const IContentControllerKey = "IContentControllerKey";

export interface IContentController {
    doUpdate():Promise<any>;
}