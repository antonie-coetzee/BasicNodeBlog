const webpack = require('webpack'); 
const devConfig = require('./webpack.client.config');
const merge = require('webpack-merge');

module.exports = merge(devConfig, { 
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('dev-server')
        }
      })
    ]
});