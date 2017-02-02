"use strict";
var express = require('express');
var app = express();
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
var Startup = (function () {
    function Startup() {
    }
    Startup.main = function () {
        console.log('Hello World');
        return 0;
    };
    return Startup;
}());
//# sourceMappingURL=app.js.map