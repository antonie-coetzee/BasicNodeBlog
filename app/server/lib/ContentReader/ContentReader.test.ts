import {ContentReader} from "./ContentReader"

describe('reading content from nested directories', () => {
  it('trial', async () => {
    let reader = new ContentReader();
    let content = "./dist/server/content/";

    for await (let res of reader.read(content)){
      console.log(res);
    }
    expect(true).toBe(true)
  });     
});