import React from 'react';
import PropTypes from 'prop-types';
import classes from './Btn.module.css';

const Btn = ({ children, type, fnClick, ...options }) => (
  <button
    type="button"
    className={`${classes.btn} ${classes[type]}`}
    onClick={fnClick}
    {...options}
  >
    {children}
  </button>
);

Btn.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  type: PropTypes.string,
  fnClick: PropTypes.func,
};

Btn.defaultProps = {
  type: 'success',
  fnClick: () => {},
};

export default Btn;
