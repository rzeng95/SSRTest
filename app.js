/* eslint-disable global-require */
const path = require('path');
const express = require('express');

const app = express();

if (process.env.NODE_ENV === 'production') {
  console.log('[server] using prod server');
  /* eslint-disable-next-line import/no-unresolved */
  const serverRender = require('./dist/server.bundle.js').default;
  app.get('/hi', (req, res) => res.send('hi'));

  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.use(serverRender());
} else {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

  // const webpackConfig = require('./webpack.config');
  const webpackConfig = require('./webpack/webpack.dev');
  const multiCompiler = webpack(webpackConfig);

  console.log('[server] using dev server');
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
    webpackHotMiddleware(
      multiCompiler.compilers.find(compiler => compiler.name === 'client')
    ),
    // webpackHotMiddleware(multiCompiler),
  );
  app.use(webpackHotServerMiddleware(multiCompiler, {
    // serverRendererOptions: { outputPath: webpackConfig[0].output.path },
    chunkName: 'server',
  }));
}

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port 3000!\n');
});
