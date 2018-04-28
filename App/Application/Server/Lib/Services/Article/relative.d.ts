declare module "relative"{   
    interface relative{
        toBase(base:string, filepath:string): string;
    }
    const lib:relative;
    export  = lib;
}


