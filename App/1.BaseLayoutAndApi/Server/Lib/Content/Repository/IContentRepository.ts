export interface IContentRepository {
    SyncWithRepository(localPath:string, repoUrl:string, branch?:string) : Promise<boolean>
}

export let IContentRepositoryKey = "IContentRepository";