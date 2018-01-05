const webpack = require('webpack'); 
const devConfig = require('./webpack.client.config');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(devConfig, { 
    plugins: [
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          mangle: {
            screw_ie8: true,
            keep_fnames: true
          },
          compress: {
            screw_ie8: true
          },
          comments: false
        }),
        new CompressionPlugin({   
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        })   
      ]
});