const path = require('path');
const webpack = require('webpack'); 

const fs = require('fs');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production'
let workingDir = __dirname.includes("Dist") ? path.resolve(__dirname,'../')  : __dirname;

module.exports = {
    devtool: 'source-map',
    
    entry: {
        client: [path.resolve(workingDir, './Src/Client.tsx')]        
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(workingDir, './Dist/Public/'),
        pathinfo: true,
        hashDigestLength: 8
    },
    resolve: {
        extensions: ['.ts', '.tsx', 'd.ts', '.js'],
        modules: [path.resolve(workingDir,'./Src'), path.resolve(workingDir,'./node_modules'), 'node_modules'],
        alias: {
            '../../theme.config': path.join(workingDir, './Src/Theme/theme.config')  
         }
    },   
    devServer: {
        historyApiFallback: true
    },
    optimization:{
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
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
            test: /\.less$/,
            use: [false ? 'style-loader' : MiniCssExtractPlugin.loader,'css-loader','less-loader' ]             
        }       
      ]
    },
    plugins: [  
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
          })                   
    ]
};
