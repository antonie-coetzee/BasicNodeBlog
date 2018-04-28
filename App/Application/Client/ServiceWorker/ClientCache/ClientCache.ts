import { injectable } from "inversify";
import { IClientCache } from "./IClientCache";

declare let caches:CacheStorage;

@injectable()
export class ClientCache implements IClientCache {
    private cacheName: string = "client-cache"
    public Name: string;
    public Instance: Promise<Cache>;

    constructor() {
        this.Name = this.cacheName;
        this.Instance = caches.open(this.cacheName)
    }

    async Clear(): Promise<void> {
        await caches.delete(this.cacheName);
        this.Instance = caches.open(this.cacheName);
    }
}