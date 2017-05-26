import {ExtractMetaHeader} from "./ExtractMetaHeader"

describe('extracting meta header', () => {
  it('extracts a header object from comment block', async () => {
    let header = `
    <!-- meta
    {
        "synopsis":"Test synopsis",
        "readingTime":"5 minutes",
        "tags":"test blog engine"
    }
    -->
    `
    let result = await ExtractMetaHeader.Extract(header);
    const desiredMetaHeader = {synopsis:"Test synopsis", readingTime:"5 minutes", tags:"test blog engine"}
    expect(result).toMatchObject(desiredMetaHeader);
  });

  it('throws an argument exception when input is null', async () => {

    let header = null;
    expect(() => {ExtractMetaHeader.Extract(header)}).toThrowError("fileData");
  });  

  it('throws an exception if header is not found', async () => {
    let header = `
    <!--
    {
        "readingTime":"5 minutes",
        "tags":"test blog engine"
    }
    -->
    `
    expect(() => {ExtractMetaHeader.Extract(header)}).toThrowError("meta header not present");
  }); 

  it('returns first meta header', async () => {
    let header = `
    <!-- meta
    {
        "synopsis":"first header",
        "readingTime":"5 minutes",
        "tags":"test blog engine"
    }
    -->
    <!-- meta
    {
        "synopsis":"Test synopsis",
        "readingTime":"5 minutes",
        "tags":"test blog engine"
    }
    -->    
    `
    const desiredMetaHeader = {synopsis:"first header", readingTime:"5 minutes", tags:"test blog engine"}
    let result = await ExtractMetaHeader.Extract(header);
    expect(result).toMatchObject(desiredMetaHeader);
  });       
});




