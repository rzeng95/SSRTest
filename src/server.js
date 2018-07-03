import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import path from 'path';

import App from './App';

const app = express();

if (process.env.NODE_ENV === 'development' && false) {
  console.log('using webpack dev server');
  // eslint-disable-next-line global-require
  const webpackDevMiddleware = require('../webpack/webpack-dev-middleware');
  app.use(webpackDevMiddleware);
} else {
  console.log('using ssr server');

  // app.use('/dist', express.static(path.resolve(__dirname, '../dist')));
  // app.use('/public', express.static('/public'));
  // app.use(express.static('public'));

  app.get('*', (req, res) => {
    const reactHtml = ReactDOMServer.renderToString(<App />);
    const htmlTemplate = `<!DOCTYPE html>
    <html>
    <head>
        <title>ssr</title>
        <script src="/app.bundle.js" defer></script>
    </head>
    <body>
        <div id="root">${reactHtml}</div>
    </body>
    </html>`;
    res.send(htmlTemplate);
  });
}


app.get('/hi', (req, res) => {
  res.send('hello');
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port 3000!\n');
});
