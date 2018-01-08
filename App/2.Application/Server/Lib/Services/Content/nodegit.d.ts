declare module "nodegit"{   
    interface git{
        Clone(url:string, contentPath:string): Promise<any>;
    }
    const lib:git;
    export = lib;    
}
