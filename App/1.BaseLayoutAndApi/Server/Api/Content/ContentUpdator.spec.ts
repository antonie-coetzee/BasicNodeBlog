import * as fs from "fs"
import "reflect-metadata";
import ContentUpdator from "./ContentUpdator"

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
            fs.mkdirSync(contentPath);
        }else{
            rmDir(contentPath);
        }
    });

    it('Clone remote repo into local directory', async () => {
        let updator = new ContentUpdator();
        await updator.UpdateContent(contentPath, "https://github.com/WireJunky/BlogContent.git");

        let readmeExists = fs.existsSync(contentPath + "/README.md");
        expect(readmeExists).toBe(true);
    });
    
    it('Clone remote repo then pull', async () => {
        let updator = new ContentUpdator();
        // first update should clone the repo
        await updator.UpdateContent(contentPath, "https://github.com/WireJunky/BlogContent.git");
        // second update should pull
        await updator.UpdateContent(contentPath, "https://github.com/WireJunky/BlogContent.git");
        let readmeExists = fs.existsSync(contentPath + "/README.md");
        expect(readmeExists).toBe(true);
    });    
});