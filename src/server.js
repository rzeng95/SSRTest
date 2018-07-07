import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  JssProvider,
  SheetsRegistry,
} from 'react-jss';

import App from './App';

// webpack-hot-server-middleware expects a function that returns an express middleware
function serverRenderer() {
  return (req, res) => {
    // React-JSS SSR setup
    const jssSheets = new SheetsRegistry();

    const customCreateGenerateClassName = () => {
      let ruleCounter = 0;
      const defaultPrefix = process.env.NODE_ENV === 'production' ? 'c' : '';

      return (rule, sheet) => {
        ruleCounter += 1;

        let prefix = defaultPrefix;
        let jssId = '';

        if (sheet) {
          prefix = sheet.options.classNamePrefix || defaultPrefix;
          if (sheet.options.jss.id != null) jssId += sheet.options.jss.id;
        }

        return `${prefix + rule.key}-${jssId && `${jssId}`}-${ruleCounter}`;
      };
    };

    const markup = renderToString(
      <JssProvider
        registry={ jssSheets }
        generateClassName={ process.env.NODE_ENV !== 'production' && customCreateGenerateClassName() }
      >
        <App />
      </JssProvider>
    );

    // console.log('jssSheets', jssSheets.toString());

    // <script src="/client.bundle.js" defer></script>
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR</title>
          <style type="text/css" id="jss-ssr">
            ${jssSheets.toString()}
          </style>
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
