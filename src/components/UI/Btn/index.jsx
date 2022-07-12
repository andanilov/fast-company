import React from "react";
import PropsType from 'prop-types';
import classes from './Btn.module.css';

const Btn = ({ text, type, fnClick}) => (
  <button type='button' className={ `${classes.btn} ${classes[type]}` } onClick={ fnClick }>
    { text }
  </button>);

Btn.PropsType = {
  text: PropsType.string,
  type: 'success',
  fnClick: PropsType.func,
}

export default Btn;
