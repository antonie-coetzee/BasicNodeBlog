let fs = require('fs');
let path = require('path')
let mkdirp = require('mkdirp');

// let destDir = './Dist/Src';
// let srcConfigFile = './Src/Application/_Parent/Server/Server.Config.json';

// function copySync(src, dest) {
//     if (!fs.existsSync(src)) {
//       return false;
//     }
  
//     let data = fs.readFileSync(src, 'utf-8');
//     fs.writeFileSync(dest, data);
// }

// console.log('copying Config.json... cwd: ' + __dirname);
// console.log(`creating ${destDir} directory`);
// mkdirp.sync(destDir);
// console.log(`copying ${srcConfigFile} to ${destDir}`);
// copySync(srcConfigFile, `${destDir}/${path.basename(srcConfigFile)}`)