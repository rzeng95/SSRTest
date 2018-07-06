/* eslint-disable global-require */
const path = require('path');
const express = require('express');

const app = express();

if (process.env.NODE_ENV === 'production') {
  console.log('[server] using prod server');
  /* eslint-disable-next-line import/no-unresolved */
  const serverRender = require('../dist/server.bundle.js').default;
  app.get('/hi', (req, res) => res.send('hi'));

  // this will be unnecessary once client bundle is served from CDN
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.use(serverRender());
} else {
  console.log('[server] using dev server');
  const webpackDevMiddleware = require('../webpack/webpack-dev-middleware');
  app.use(webpackDevMiddleware);
}

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port 3000!\n');
});
