import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class App extends Component {
  render() {
    console.log('app isClient', __CLIENT__);
    console.log('app isServer', __SERVER__);
    return (
      <div>
        Hello worldxx
      </div>
    );
  }
}

export default hot(module)(App);
