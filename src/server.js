import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './App';

// webpack-hot-server-middleware expects a function that returns an express middleware
function serverRenderer() {
  return (req, res) => {
    const markup = renderToString(<App />);

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src="/client.bundle.js" defer></script>
        </head>

        <body>
          <div id="root">${markup}</div>
        </body>
      </html>
    `);
  };
}

export default serverRenderer;
