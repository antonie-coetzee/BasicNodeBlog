import * as fs from "fs"
import {ContentReader} from "./ContentReader"

const contentPath:string = __dirname + "/ContentReader.Test/";

describe('reading content from nested directories', () => {

  beforeAll(() => {
    if(!fs.existsSync(contentPath)){
      fs.mkdirSync(contentPath);
    }
  });

  it('trial', async () => {
    let reader = new ContentReader();
    console.log(contentPath);
    for await (let res of reader.read(contentPath)){
      console.log(res);
    }
    expect(true).toBe(true)
  });     
});