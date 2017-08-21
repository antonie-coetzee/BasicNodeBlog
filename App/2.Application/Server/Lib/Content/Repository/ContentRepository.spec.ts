import * as fs from "fs"
import "reflect-metadata";
import ContentRepository from "./ContentRepository"

const contentPath:string = __dirname + "/test.repo/";

describe('Pull or if not exists clones git repository', () => {
    let rmDir = function(dirPath) {
        try { var files = fs.readdirSync(dirPath); }
        catch(e) { return; }
        if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
            else
            rmDir(filePath);
        }
        fs.rmdirSync(dirPath);
    };    

    beforeAll(() => {
        if(!fs.existsSync(contentPath)){
            fs.mkdirSync(contentPath); // create empty directory before test
        }else{
            rmDir(contentPath); //exists from previous test, remove
        }
    });

    it('Clone remote repo into local directory', async () => {
        let crep = new ContentRepository();
        await crep.SyncWithRepository(contentPath, "https://github.com/WireJunky/BlogContent.git");

        let readmeExists = fs.existsSync(contentPath + "/README.md");
        expect(readmeExists).toBe(true);
    });
    
    it('Clone remote repo then pull', async () => {
        let crep = new ContentRepository();
        // first update should clone the repo
        await crep.SyncWithRepository(contentPath, "https://github.com/WireJunky/BlogContent.git");
        // second update should pull
        await crep.SyncWithRepository(contentPath, "https://github.com/WireJunky/BlogContent.git");
        let readmeExists = fs.existsSync(contentPath + "/README.md");
        expect(readmeExists).toBe(true);
    });    
});