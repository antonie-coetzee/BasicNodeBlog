const path = require('path');
const webpack = require('webpack'); 

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        client: path.resolve(__dirname, './app/client/index.tsx')
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist/public/'),
        pathinfo: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx'],
        modules: [path.resolve(__dirname,'./app'), path.resolve(__dirname,'./node_modules')]
    },   
    module: {
      rules: [
        {
            test: /\.(png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader : 'file-loader'
        },
        { 
            test: /\.tsx?$/, 
            loader: 'ts-loader', 
            options: {
            configFileName:  'client/tsconfig.json',
            logInfoToStdOut: true
            }, 
            exclude: [/node_modules/]
        },
        {
            test: /\.s?css$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract({
                        fallbackLoader: "style-loader",
                        loader: [
                        { loader: 'css-loader', query: { modules: true, importLoaders: 3, localIdentName: '[name]__[local]__[hash:base64:5]' } },
                        { loader: 'postcss-loader',options: {
                                                        plugins: function () {
                                                        return [
                                                            require('postcss-google-font'),
                                                            require('precss'),
                                                            require('autoprefixer')
                                                        ];
                                                        }
                                                    } 
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
        new HtmlWebpackPlugin({hash:true, template:'app/client/index.ejs'})        
    ]
};
