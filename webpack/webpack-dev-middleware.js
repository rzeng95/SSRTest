const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const express = require('express');

const clientConfig = require('./webpack.dev.js')[0];

const app = express();
const compiler = webpack(clientConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: clientConfig.output.publicPath,
  // logLevel: 'warn',
}));

app.use(require('webpack-hot-middleware')(compiler));

module.exports = app;
