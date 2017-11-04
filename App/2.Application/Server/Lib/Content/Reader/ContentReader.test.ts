import * as fs from "fs"
import {ContentReader} from "./ContentReader"
import * as dirtree from "directory-tree"

const contentPath:string = __dirname + "/test.files/";

describe('reading content from nested directories', () => {

  beforeAll(() => {
    if(!fs.existsSync(contentPath)){
      fs.mkdirSync(contentPath);
    }
  });

  it('trial', async () => {

    //console.log(dirtree("C:/Dev/dirtreetest"))

    // let reader = new ContentReader();
    // for await (let res of reader.read(contentPath)){
    //   console.log(res);
    // }
    expect(true).toBe(true)
  });     
});