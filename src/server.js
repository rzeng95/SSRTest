const express = require('express');

const app = express();

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const webpackDevMiddleware = require('../webpack/webpack-dev-middleware');
  app.use(webpackDevMiddleware);
}


app.get('/hi', (req, res) => {
  res.send('hello');
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port 3000!\n');
});
