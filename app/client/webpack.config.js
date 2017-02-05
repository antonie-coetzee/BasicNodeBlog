const path = require('path');
const webpack = require('webpack'); 

module.exports = {
    entry: path.resolve(__dirname, '../client.tsx'),
    output: {
        filename: 'client.js',
        path: './dist/client',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    devtool: 'source-map',
    module: {
      rules: [
        { 
          test: /\.tsx?$/, 
          loader: 'ts-loader', 
          options: {
            transpileOnly: true,
            configFileName: './app/client/tsconfig.json',
            logInfoToStdOut: true
          } 
        }
      ]
    },
    plugins: [
      //new webpack.optimize.UglifyJsPlugin()
    ]
};
