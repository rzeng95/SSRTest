import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class App extends Component {
  render() {
    console.log('isClient', __CLIENT__, ' | isServer', __SERVER__);
    return (
      <div>
        Hello worldxxxx
      </div>
    );
  }
}

export default hot(module)(App);
