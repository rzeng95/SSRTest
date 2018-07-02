import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class App extends Component {
  render() {
    console.log('app isServer: ', __SERVER__, '  |  app isClient', __CLIENT__);
    console.log('this.props.bar', this.props.bar);
    return (
      <div>
        Hellox { this.props.bar }
      </div>
    );
  }
}

export default hot(module)(App);
