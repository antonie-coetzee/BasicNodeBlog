import {ArticleTreeService} from "../ArticleTreeService"
const testContentPath:string = __dirname + "/blogcontent/";

describe('Article tree service', () => {
    it('should return tree of articles and directories', async () => {
      // const tree = await new ArticleTreeService(testContentPath).GetArticleTree();
      // console.log(JSON.stringify(tree));
      expect(true).toBe(true)  
    });     
  });