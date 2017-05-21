export interface IContentUpdator {
    UpdateContent(repoPath:string, repoUrl:string) : Promise<boolean>
}

export let IContentUpdatorKey = "IContentKey";