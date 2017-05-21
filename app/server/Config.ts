import { injectable} from "inversify";
import {IConfig} from "./IConfig"

@injectable()
export default class Config implements IConfig {
    contentUrl:string = "https://github.com/WireJunky/BlogContent.git"
}