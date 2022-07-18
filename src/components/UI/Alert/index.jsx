import React from 'react';
import PropTypes from 'prop-types';
import classes from './Alert.module.css';

const Alert = ({ type, text }) => (
  <div className={`${classes.alert} ${classes[type]}`}>{text}</div>
);

Alert.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Alert.defaultProps = {
  type: 'success',
};

export default Alert;
