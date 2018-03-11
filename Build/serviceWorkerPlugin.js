const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var pending = list.length;
      if (!pending) return done(null, results);
      list.forEach(function(file) {
        file = path.resolve(dir, file);
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function(err, res) {
              results = results.concat(res);
              if (!--pending) done(null, results);
            });
          } else {
            if(path.extname(file) != '.map'){
                results.push(file);
            }           
            if (!--pending) done(null, results);
          }
        });
      });
    });
  };

function ServiceWorker(outputPath, templatePath, staticAssets, done){
    fs.readFile(templatePath, "utf8", function(err, data) {
        if (err) throw err;
        let template = handlebars.compile(data);
        let result = template({staticAssets:staticAssets});
        fs.writeFileSync(outputPath, result);
        done();
    });
}

function ServiceWorkerPlugin(options) {
    if(options == null) throw new Error("plugin options null or undefined");
    if(options.templatePath == null) throw new Error("templatePath required");
    if(options.outputPath == null) throw new Error("outputPath required");
    
    this.templatePath = options.templatePath;
    this.outputPath = options.outputPath;
  }
  
ServiceWorkerPlugin.prototype.apply = function(compiler) {
    const self = this;
    compiler.plugin('after-emit', function(compilation, callback) {       
        var outputPath = compilation.outputOptions.path;
        walk(outputPath, function(err, results){
            if(err) throw err;
            var relativeResults = results
                                    .map(f=>{return f.replace(outputPath, '').replace(/\\/g, '/', );})
                                    .filter(r=>{return r.includes('index.html') != true;});
            relativeResults.push('/');
            ServiceWorker(self.outputPath, self.templatePath, relativeResults, function(){callback();})
        });  
    });
};

module.exports = ServiceWorkerPlugin;
  