const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const express = require('express');

const multiConfig = require('./webpack.dev.js');

const clientConfig = multiConfig[0];

const app = express();

const multiCompiler = webpack(multiConfig);
const clientCompiler = multiCompiler.compilers[0];

app.use(webpackDevMiddleware(multiCompiler, {
  publicPath: clientConfig.output.publicPath,
  logLevel: 'warn',
  serverSideRender: true,
}));

app.use(require('webpack-hot-middleware')(clientCompiler));

app.use(webpackHotServerMiddleware(multiCompiler, {
  serverRendererOptions: { outputPath: clientConfig.output.path },
}));

module.exports = app;
