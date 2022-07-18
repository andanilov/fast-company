import React from 'react';
import PropTypes from 'prop-types';
import classes from './Icon.module.css';
import 'material-icons/iconfont/material-icons.css';

const Bookmark = ({ type, fnClick }) => (
  <span className={`${classes.icon} material-icons-sharp`} onClick={fnClick}>
    {type}
  </span>
);

Bookmark.propTypes = {
  type: PropTypes.string.isRequired,
  fnClick: PropTypes.func,
};

Bookmark.defaultProps = {
  fnClick: () => {},
};

export default Bookmark;
