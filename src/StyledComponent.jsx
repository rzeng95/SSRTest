import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  main: {
    color: 'green',
  },
};

const propTypes = {
  classes: PropTypes.object.isRequired,
};

class StyledComponent extends Component {
  render() {
    const { classes } = this.props;
    console.log('classes.main', classes.main)
    return (
      <div className={ classes.main }>
        Hello, I am green text
      </div>
    );
  }
}

StyledComponent.propTypes = propTypes;

export default injectSheet(styles)(StyledComponent);
