const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app', 'index.html'),
    }),
  ],
  module: {
    loaders: [
      {
        loader: 'html-es6-template-loader',
        test: /\.html$/,
        exclude(filePath) {
          return filePath === path.join(__dirname, 'app', 'index.html');
        },
        query: {
          transpile: true,
        },
      },
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};

if (process.env.NODE_ENV === 'development') {
  config.watch = true;
  config.devtool = 'source-map';
} else if (process.env.NODE_ENV === 'hot') {
  config.devtool = 'source-map';
  config.devServer = {
    hot: true,
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
