var fs = require("fs");
var http = require("http");

let directory = "./Tools"
let codegenFile = "./Tools/swagger-codegen-cli.jar"

console.log("checking if tools folder exists");
if (!fs.existsSync(directory)){
    console.log("not found, creating tools folder");
    fs.mkdirSync(directory);
}

console.log("checking if swagger-codegen is present at: " + codegenFile);
if (!fs.existsSync(codegenFile)) {
    console.log("not found, downloading");
    let file = fs.createWriteStream("./Tools/swagger-codegen-cli.jar");
    let request = http.get("http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/2.2.3/swagger-codegen-cli-2.2.3.jar", function(response) {
      response.pipe(file);   
    });
    request.on('response', function(res){
        res.on('end', function () {
          console.log('\n');
          console.log("swagger-codegen downloaded successfully, continuing");
        });
      });     
      request.end();
}else{
    console.log("swagger-codegen present");
}