import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.css';

const Input = ({ fnChange, ...rest }) => (
  <input
    className={classes.input}
    onChange={(event) => fnChange(event.target.value)}
    {...rest}
  />);

Input.propTypes = {
  fnChange: PropTypes.func,
};

Input.defaultProps = {
  fnChange: () => {},
};

export default Input;
