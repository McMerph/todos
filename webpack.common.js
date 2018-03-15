const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({template: './src/view/index.html'}),
    new FaviconsWebpackPlugin('./src/view/resources/favicon.svg')
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          {loader: 'style-loader'}, // adds CSS to the DOM by injecting a <style> tag
          {loader: 'css-loader'}, // interprets @import and url() like import/require() and will resolve them
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: ['babel-loader', 'awesome-typescript-loader', 'stylelint-custom-processor-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|jpg|jpeg|png|webp)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 0,
            name: 'asset/[name]-[sha512:hash:base64:7].[ext]'
          }
        }]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
