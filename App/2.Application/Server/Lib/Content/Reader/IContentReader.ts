
export interface IContentReader {
    read(path:string) : AsyncIterableIterator<string>
}