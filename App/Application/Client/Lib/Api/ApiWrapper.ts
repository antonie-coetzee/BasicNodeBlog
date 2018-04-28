import {injectable} from "inversify";
import { DefaultApi } from "./Generated/api";

export let ApiWrapperKey = "ApiWrapper";

@injectable()
export class ApiWrapper {
    public Api : DefaultApi
    
    constructor() {
        this.Api = new DefaultApi();
    }
}