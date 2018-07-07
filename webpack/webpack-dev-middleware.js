const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const webpackConfig = require('./webpack.dev');

const app = express();

const multiCompiler = webpack(webpackConfig);
const clientCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'client');

app.use(
  webpackDevMiddleware(multiCompiler, {
    publicPath: webpackConfig[0].output.path,
    stats: {
      colors: true,
      modules: false,
      version: false,
      entrypoints: false,
      builtAt: false,
    },
    serverSideRender: true,
  })
);

app.use(webpackHotMiddleware(clientCompiler));

app.use(webpackHotServerMiddleware(multiCompiler, {
  chunkName: 'server',
}));

module.exports = app;
