const React = require('react');
const express = require('express');
const { renderToString } = require('react-dom/server');
const webpackDevMiddleware = require('../webpack/webpack-dev-middleware');

// const App = require('./App').default;

const app = express();

console.log('serverrx', process.env.NODE_ENV);
// console.log('server variablesxxx', __CLIENT__, __SERVER__);

// if (process.env.NODE_ENV === 'development') {
//   // eslint-disable-next-line global-require
//   const webpackDevMiddleware = require('../webpack/webpack-dev-middleware');
//   app.use(webpackDevMiddleware);
// }

app.use(webpackDevMiddleware);

// app.get('*', (req, res) => {
//   console.log('server send html');
//   const bar = 'Bar';
//
//   const markup = renderToString(<App foo={ bar } />);
//   //         <script src="/app.bundle.js" defer></script>
//   res.send(`
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>SSR with RR</title>
//         <script src="/app.bundle.js" defer></script>
//       </head>
//
//       <body>
//         <div id="root">${markup}</div>
//       </body>
//     </html>
//   `);
// });


app.get('/hi', (req, res) => {
  res.send('hello');
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port 3000!\n');
});

// if (module.hot) {
//   console.log('[server] module is hot');
// }
