import React from 'react';
import PropTypes from 'prop-types';
import classes from './Btn.module.css';

const Btn = ({ text, type, fnClick }) => (
  <button
    type="button"
    className={`${classes.btn} ${classes[type]}`}
    onClick={fnClick}
  >
    {text}
  </button>
);

Btn.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  fnClick: PropTypes.func,
};

Btn.defaultProps = {
  type: 'success',
  fnClick: () => {},
};

export default Btn;
