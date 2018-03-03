const webpack = require('webpack'); 
const config = require('./webpack.client.config');
const merge = require('webpack-merge');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Visualizer = require('webpack-visualizer-plugin');

console.log(`process.env.HOT_RELOAD is: ${process.env.HOT_RELOAD}`);
console.log(`process.env.ANALYSE is: ${process.env.ANALYSE}`);

module.exports = merge(config, { 
    entry: process.env.HOT_RELOAD ? { client: ['webpack-hot-middleware/client?reload=true'] }: {},
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('dev-server')
        }
      }),
      process.env.HOT_RELOAD ? new webpack.HotModuleReplacementPlugin() : function(){},
      process.env.ANALYSE ? 
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }) : function(){},
      process.env.ANALYSE ? new Visualizer({
          filename: 'statistics.html'
        }) : function(){}
    ]
});