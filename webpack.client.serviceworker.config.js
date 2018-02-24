const path = require('path');
const webpack = require('webpack'); 

const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
let workingDir = __dirname.includes("Dist") ? path.resolve(__dirname,'../')  : __dirname;

const opts = {
    ServiceWorker: true,
    "ifdef-verbose": true,     
    "ifdef-triple-slash": true  
 };

module.exports = {
    devtool: 'source-map',
    entry: [
        path.resolve(workingDir, './App/2.Application/Client/ServiceWorker/ServiceWorker.ts')
    ],
    output: {
        filename: 'serviceworker.js',
        chunkFilename: '[name].chunk.[chunkhash].js',
        path: path.resolve(workingDir, './Dist/Public/'),
        pathinfo: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', 'd.ts', '.js'],
        modules: [path.resolve(workingDir,'./App'), path.resolve(workingDir,'./node_modules'), 'node_modules'],
        // setup the stub modules
        alias: {
            fs: path.resolve(workingDir,'./App/1.Framework/Client/lib/ServiceWorker/fs.js'),
            net: path.resolve(workingDir,'./App/1.Framework/Client/lib/ServiceWorker/net.js'),
            "./view": path.resolve(workingDir,'./App/1.Framework/Client/lib/ServiceWorker/view.js')
        }
    },   
    devServer: {
        historyApiFallback: true
    },
    module: {
      rules: [
        { 
            test: /\.tsx?$/, 
            use:[
                'ts-loader',
                {loader: "ifdef-loader", options: opts}
            ],
            exclude: [/node_modules/]
        }   
      ]
    },
    plugins: [                               
    ]
};
