let fs = require('fs');
let path = require('path')
let mkdirp = require('mkdirp');

let destDir = './Dist';

function copySync(src, dest) {
    if (!fs.existsSync(src)) {
      return false;
    }
  
    let data = fs.readFileSync(src, 'utf-8');
    fs.writeFileSync(dest, data);
}

let shell = require('shelljs');
process.env.PATH += (path.delimiter + path.join(process.cwd(), 'node_modules', '.bin'));

console.log('creating swagger spec...');
if (shell.exec('tsoa swagger').code !== 0) {
    shell.echo('Error: swagger spec generation failed');
    shell.exit(1);
}

let tsoaConf = require('../tsoa.json')
let sourceSpecPath = tsoaConf.swagger.outputDirectory + '/swagger.json'
let distSpecDir = destDir + '/Src/Application/Server/Middleware/SwaggerUI/'
console.log('source swagger spec path: ' + sourceSpecPath);
console.log('copying to Dist directory: ' + distSpecDir);
mkdirp.sync(distSpecDir);
copySync(sourceSpecPath, distSpecDir + '/swagger.json')

console.log('creating expressjs routes from spec');
if (shell.exec('tsoa routes').code !== 0) {
    shell.echo('Error: expressjs route generation failed');
    shell.exit(1);
}

if(!shell.which('java')){
    console.error('prebuild script requires Java to execute');
}

console.log('generating api client from swagger spec');
let codegenPath = './Tools/swagger-codegen-cli.jar';
let inputSpecPath = './Src/Application/Server/Middleware/SwaggerUI/swagger.json';
let outputPath = './Src/Application/Client/Lib/Api/Generated';
mkdirp(outputPath);
let cmd = `java -jar ${codegenPath} generate -i ${inputSpecPath} -l typescript-fetch -o ${outputPath}`;
console.log('executing: ' + cmd);
if (shell.exec(cmd).code !== 0) {
    shell.echo('Error: expressjs route generation failed');
    shell.exit(1);
}
console.log('updating basepath of generated API clinet');
let apiFile = outputPath + "/api.ts";
fs.readFile(apiFile, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log("updating...");
    var result = data.replace('https://localhost:8080/api/v1', 'http://localhost:8080/api/v1');
  
    fs.writeFile(apiFile, result, 'utf8', function (err) {
       if (err) return console.log(err);
       console.log('prebuild complete');
    });
  });

