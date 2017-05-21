export interface IContentUpdator {
    UpdateContent(repoPath:string, repoUrl:string) : Promise<boolean>
}

export let IContentUpdatorSymbol = Symbol("IContentUpdator");