const clientConfig = require('./webpack.config.client.prod');
const serverConfig = require('./webpack.config.server.prod');

module.exports = [
  clientConfig,
  serverConfig,
];
