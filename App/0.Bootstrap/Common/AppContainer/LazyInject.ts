import { interfaces } from "inversify";

declare var lazyInject:(serviceIdentifier: string | symbol) => (proto: any, key: string) => void;
//declare var lazyMultiInject: (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>) => (proto: any, key: string) => void;
//declare var lazyInjectNamed: (serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>, named: string) => (proto: any, key: string) => void;

//export {lazyInject, lazyMultiInject, lazyInjectNamed}
//export {lazyInject}