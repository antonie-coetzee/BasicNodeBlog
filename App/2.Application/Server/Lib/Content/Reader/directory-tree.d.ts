declare module "directory-tree"{
    
    interface IItem {
        path:string;
        name:string;
        size:number;
        type:string;
        childer:IItem[];
    }

    interface ICallback{
        (item:IItem, path:string):void
    }

    interface IOptions{
        exclude?:string;
        extensions?:string;
    }

    interface IDirectoryTree{
        (path:string, options?:IOptions, callback?:ICallback):IItem;
    }

    const directoryTree:IDirectoryTree;

    export = directoryTree;
}