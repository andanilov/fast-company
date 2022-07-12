import React from 'react';
import classes from './Alert.module.css';
import PropsType from 'prop-types';

const Alert = ({ type, text }) => (
  <div className={`${classes.alert} ${classes[type]}`}>
    { text }
  </div>);

Alert.PropsType = {
  type: 'success',
  text: PropsType.string,
};

export default Alert;
