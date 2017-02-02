var express = require('express');
var app = express();
import commonClass from "../common/common"

app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
});

class Startup {
    public static main(): number {
        console.log('Hello World');
        return 0;
    }
} 
