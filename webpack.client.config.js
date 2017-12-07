const path = require('path');
const webpack = require('webpack'); 

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        client: path.resolve(__dirname, './App/Client.tsx')
    },
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, './Dist/Public/'),
        pathinfo: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', 'd.ts'],
        modules: [path.resolve(__dirname,'./App'), path.resolve(__dirname,'./node_modules')]
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
            }
        },    
        { 
            test: /\.tsx?$/, 
            loader: 'ts-loader', 
            options: {
            configFileName:  './tsconfig.json',
            logInfoToStdOut: true
            }, 
            exclude: [/node_modules/]
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                        use: [
                            { 
                                loader: 'css-loader'
                            }
                        ]
                    })
        },        
        {
            test: /\.(sass|scss)$/,
            use: ExtractTextPlugin.extract({
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
        new ExtractTextPlugin('styles.css'),
            new Visualizer({
                filename: './statistics.html'
            }),
        new HtmlWebpackPlugin({hash:true, template:'App/Index.ejs'}),
        new webpack.WatchIgnorePlugin([
                /sass\.ts$/
            ])       
    ]
};
