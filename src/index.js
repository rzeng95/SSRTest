import React from 'react';
import { hydrate } from 'react-dom';

import App from './App';

console.log('/src/index.js');
hydrate(<App />, document.getElementById('root'));
