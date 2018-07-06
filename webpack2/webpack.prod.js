const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const clientConfig = {
  entry: {
    app: './src/index.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // TODO: try babel-loader?cacheDirectory=true
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    // TODO: add uglifyjsplugin
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
};

const serverConfig = {
  entry: './src/server.js',
  target: 'node',
  mode: 'production',
  externals: [nodeExternals()],
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
    ],
  },
  plugins: [
    // TODO: add uglifyjsplugin
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
};

module.exports = [clientConfig, serverConfig];
