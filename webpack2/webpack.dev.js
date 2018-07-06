const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const clientConfig = {
  name: 'client',
  entry: {
    app: ['./src/index.js', 'webpack-hot-middleware/client'],
  },
  mode: 'development',
  devtool: 'inline-source-map',
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
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      'process.env.NODE_ENV': JSON.stringify('development'),
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
  name: 'server',
  entry: './src/server.js',
  target: 'node',
  mode: 'development',
  devtool: 'inline-source-map',
  externals: [nodeExternals()],
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    // new WebpackShellPlugin({
    //   onBuildEnd: ['node dist/server.bundle.js --watch dist'],
    // }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
};

module.exports = [clientConfig, serverConfig];

// module.exports = serverConfig;
