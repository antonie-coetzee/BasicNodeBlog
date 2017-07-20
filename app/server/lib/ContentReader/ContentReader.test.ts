import {ContentReader} from "./ContentReader"
import * as path from "path"

describe('reading content from nested directories', () => {
  it('trial', async () => {
    let reader = new ContentReader();
    let content = "./dist/server/content/";
    console.log(path.resolve(content));
    for await (let res of reader.read(content)){
      console.log(res);
    }
    expect(true).toBe(true)
  });     
});

describe('reading content from nested directories', () => {
  it('trial', () => {
    expect(true).toBe(true)
  });     
});