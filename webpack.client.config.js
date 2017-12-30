const path = require('path');
const webpack = require('webpack'); 

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin');

var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

let workingDir = __dirname.includes("Dist") ? path.resolve(__dirname,'../')  : __dirname;

module.exports = {
    devtool: 'source-map',
    entry: [
        path.resolve(workingDir, './App/Client.tsx'),  'webpack-hot-middleware/client?reload=true'
    ],
    output: {
        filename: '[name].chunk.[chunkhash].js',
        chunkFilename: '[name].chunk.[chunkhash].js',
        path: path.resolve(workingDir, './Dist/Public/'),
        pathinfo: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', 'd.ts'],
        modules: [path.resolve(workingDir,'./App'), path.resolve(workingDir,'./node_modules')],
        alias: {
            bulma: path.resolve(workingDir, './node_modules/bulma')
        },
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
            test: /\.css$/,
            use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                        use: [
                            { 
                                loader: 'css-loader'
                            }
                        ]
                    }))
        },        
        {
            test: /\.(sass|scss)$/,
            use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
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
        }       
      ]
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new ExtractTextPlugin('styles.css'),
        new Visualizer({
            filename: 'statistics.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static'
        // }),        
        new HtmlWebpackPlugin({hash:false, template: workingDir +'/App/Index.ejs'}),
        new webpack.WatchIgnorePlugin([
                /sass\.ts$/
            ]),  
        new CommonsChunkPlugin({
            name: 'common',
            filename: 'common.chunk.[hash].js',
            minChunks(module, count) {
                var context = module.context;
                return context && context.indexOf('node_modules') >= 0;}
        }),
        //new CleanWebpackPlugin([workingDir + '/Dist/Public'])                         
    ]
};
