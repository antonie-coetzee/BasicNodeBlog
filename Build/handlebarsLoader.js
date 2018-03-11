const handlebars = require('handlebars');

module.exports = function(source) {
        console.log('asdsdf');
        // Apply some transformations to the source...
        let template = handlebars.compile(source);
        let result = template({assets:['asd','sdf','fgh']});
        return result;
    }
