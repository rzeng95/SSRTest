const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const clientConfig = {
  name: 'client',
  entry: {
    client: './src/client.js',
  },
  mode: 'production',
  // devtool: 'eval',
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
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
};

const serverConfig = {
  name: 'server',
  target: 'node',
  // devtool: 'eval',
  entry: {
    server: './src/server.js',
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
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
};

module.exports = [clientConfig, serverConfig];
