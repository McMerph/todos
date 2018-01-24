const webpack = require('webpack');
// const reloadPlugin = require('reload-html-webpack-plugin'); // reload page after html edit
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    useLocalIp: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // new reloadPlugin() // reload page after html edit
  ]
});
