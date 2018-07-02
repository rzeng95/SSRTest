const React = require('react');
const express = require('express');
const serialize = require('serialize-javascript');

const { renderToString } = require('react-dom/server');

// const App = require('./App').default;

const app = express();

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const webpackDevMiddleware = require('../webpack/webpack-dev-middleware');
  app.use(webpackDevMiddleware);
}
// app.get('/hi', (req, res) => {
//   res.send('hi');
// });


// app.get('*', (req, res) => {
//   const bar = 'Bar';
//
//   const markup = renderToString(<App foo={ bar } />);
//
//   res.send(`
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>SSR with RR</title>
//         <script src="/app.bundle.js" defer></script>
//         <script>window.__INITIAL_DATA__ = ${serialize(bar)}</script>
//       </head>
//
//       <body>
//         <div id="root">${markup}</div>
//       </body>
//     </html>
//   `);
// });

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port 3000!\n');
});
