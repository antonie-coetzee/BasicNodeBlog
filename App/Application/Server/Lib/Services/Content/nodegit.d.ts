interface Repository{
    open(contentPath:string):Promise<Repository>;
    fetchAll():Promise<Repository>;
    mergeBranches(local:string, remote:string);
}

interface git{
    Clone(url:string, contentPath:string): Promise<any>;
    Repository:Repository;
}

declare module "nodegit"{   
    const lib:git;
    export = lib;    
}
