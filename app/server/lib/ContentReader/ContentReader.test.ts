import * as fs from "fs"
import {ContentReader} from "./ContentReader"

const contentPath:string = __dirname + "/test.files/";

describe('reading content from nested directories', () => {

  beforeAll(() => {
    // if(!fs.existsSync(contentPath)){
    //   fs.mkdirSync(contentPath);
    // }
  });

  it('trial', async () => {
    let reader = new ContentReader();
    for await (let res of reader.read(contentPath)){
      console.log(res);
    }
    expect(true).toBe(true)
  });     
});