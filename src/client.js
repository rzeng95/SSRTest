import React from 'react';
import { hydrate } from 'react-dom';
import {
  JssProvider,
  // SheetsRegistry,
} from 'react-jss';

import App from './App';

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

hydrate(
  <JssProvider
    generateClassName={ process.env.NODE_ENV !== 'production' && customCreateGenerateClassName() }
  >
    <App />
  </JssProvider>,
  document.getElementById('root'), () => {
    console.log('hydration complete');
    // We don't need the static css any more once we have launched our application.
    const ssStyles = document.getElementById('jss-ssr');
    ssStyles.parentNode.removeChild(ssStyles);
  }
);
