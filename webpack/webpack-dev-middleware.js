const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const webpackConfig = require('./webpack.dev');

const app = express();

const multiCompiler = webpack(webpackConfig);
const clientCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'client');

app.get('/hi', (req, res) => res.send('hixxx'));

app.use(
  webpackDevMiddleware(multiCompiler, {
    publicPath: webpackConfig[0].output.path,
    // stats: "minimal"
    stats: 'minimal',
    serverSideRender: true,
  }),
);
app.use(
  // webpackHotMiddleware(multiCompiler.compilers.find(compiler => compiler.name === 'client')),
  webpackHotMiddleware(clientCompiler),
);
app.use(webpackHotServerMiddleware(multiCompiler, {
  // serverRendererOptions: { outputPath: webpackConfig[0].output.path },
  chunkName: 'server',
}));

module.exports = app;
