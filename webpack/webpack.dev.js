const webpack = require('webpack');
const path = require('path');
const notifier = require('node-notifier');

// Custom webpack plugin
function OnCompletionPlugin() {}
OnCompletionPlugin.prototype.apply = (compiler) => {
  compiler.hooks.done.tap('on-complete-done', () => {
    notifier.notify({
      title: 'Webpack: Build Success!',
      message: '🙌 🙌 🙌',
    });
  });

  compiler.hooks.failed.tap('on-complete-failed', () => {
    notifier.notify({
      title: 'Webpack: Build Failed',
      message: 'Please check console for errors',
    });
  });
};

const clientConfig = {
  name: 'client',
  entry: {
    client: ['webpack-hot-middleware/client', './src/client.js'],
  },
  mode: 'development',
  devtool: 'eval',
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
      __CLIENT__: true,
      __SERVER__: false,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new OnCompletionPlugin(),
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
  target: 'node',
  devtool: 'eval',
  entry: {
    server: './src/server.js',
  },
  mode: 'development',
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
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
};

module.exports = [clientConfig, serverConfig];
