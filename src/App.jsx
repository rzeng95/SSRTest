import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import StyledComponent from './StyledComponent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1,
    };
  }

  render() {
    // console.log('isClient', __CLIENT__, ' | isServer', __SERVER__);
    return (
      <div>
        Counter { this.state.counter }
        <div onClick={ () => this.setState((prevState) => ({ counter: prevState.counter += 1 }))}>
          click me!!!
        </div>
        <StyledComponent />
      </div>
    );
  }
}

export default hot(module)(App);
