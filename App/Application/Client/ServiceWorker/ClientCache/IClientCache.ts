export interface IClientCache {
    readonly Name:string;
    readonly Instance:Promise<Cache>;
    Clear():Promise<void>;
}

export const IClientCacheKey = "IClientCacheKey";