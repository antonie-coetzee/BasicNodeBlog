const path = require('path');
const webpack = require('webpack'); 

const fs = require('fs');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

let workingDir = __dirname.includes("Dist") ? path.resolve(__dirname,'../')  : __dirname;

module.exports = {
    devtool: 'source-map',
    entry: {
        serviceworker: path.resolve(workingDir, './App/ServiceWorker.hbs'),
        client: [path.resolve(workingDir, './App/Client.tsx')]        
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(workingDir, './Dist/Public/'),
        pathinfo: true,
        hashDigestLength: 8
    },
    resolve: {
        extensions: ['.ts', '.tsx', 'd.ts', '.js'],
        modules: [path.resolve(workingDir,'./App'), path.resolve(workingDir,'./node_modules'), 'node_modules'],
        alias: {
            bulma: path.resolve(workingDir, './node_modules/bulma')
        },
    },   
    resolveLoader: {
        alias: {
          "handlebars-loader": path.join(workingDir, "./Scripts/handlebarsLoader")
        }
    },    
    devServer: {
        historyApiFallback: true
    },
    module: {
      rules: [
        {
            test: /\.(png|jpe?g|gif|ico|svg)$/,
            loader : 'file-loader',
            options: {
                name: 'assets/[name].[ext]',
            }
        },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
            loader: "url-loader?limit=10000&mimetype=application/font-woff" ,
            options: {
                name: 'font/[name].[ext]',
            }
        },
        { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
            loader: "file-loader",
            options: {
                name: 'font/[name].[ext]',
                compilerOptions:{
                    module:"esnext"
                }
            }
        },    
        { 
            test: /\.tsx?$/, 
            use:[
                'ts-loader'
            ],
            exclude: [/node_modules/]
        },
        { 
            test: /\.hbs$/, 
            use:[                          
                { 
                    loader: 'ts-loader',
                    options: { appendTsSuffixTo: [/\.hbs$/] }
                },
                {loader: 'handlebars-loader'}
            ],
            exclude: [/node_modules/]
        },        
        {
            test: /\.css$/,
            use: process.env.HOT_RELOAD ? 
                    ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                        use: [
                            { 
                                loader: 'css-loader'
                            }
                        ]
                    }))
                    :
                    ExtractTextPlugin.extract({
                        use: [
                            { 
                                loader: 'css-loader'
                            }
                        ]
                    })
        },        
        {
            test: /\.(sass|scss)$/,
            use: process.env.HOT_RELOAD ? 
                    ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                        use: [
                            { 
                                loader: 'typings-for-css-modules-loader', 
                                    query: {
                                        modules:true, 
                                        url:true, 
                                        localIdentName: '[local]' } 
                            },
                            {
                                loader: 'sass-loader' 
                            }
                        ]
                    }))
                    :
                    ExtractTextPlugin.extract({
                        use: [
                            { 
                                loader: 'typings-for-css-modules-loader', 
                                    query: {
                                        modules:true, 
                                        url:true, 
                                        localIdentName: '[local]' } 
                            },
                            {
                                loader: 'sass-loader' 
                            }
                        ]
                    })                    
        }       
      ]
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new CleanWebpackPlugin(path.resolve(workingDir, './Dist/Public/')),
        new ExtractTextPlugin('styles.css'),      
        new HtmlWebpackPlugin({hash:false, template: workingDir +'/App/Index.ejs'}),
        new ScriptExtHtmlWebpackPlugin({
            async: 'serviceworker',
            defaultAttribute: 'sync'
        }),
        new webpack.WatchIgnorePlugin([
                /sass\.ts$/
            ]),  
        new CommonsChunkPlugin({
            name: 'common',
            filename: 'common.[hash].js',
            minChunks(module, count) {
                var context = module.context;
                return context && context.indexOf('node_modules') >= 0;}
        })                      
    ]
};
