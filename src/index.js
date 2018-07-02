import React from 'react';
import { hydrate } from 'react-dom';
// import ReactDOM from 'react-dom';

import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

hydrate(<App bar={ window.__INITIAL_DATA__ } />, document.getElementById('app'));
