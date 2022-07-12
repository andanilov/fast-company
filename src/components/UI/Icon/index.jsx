import React from 'react';
import classes from './Icon.module.css';
import 'material-icons/iconfont/material-icons.css';

const Bookmark = ({ type, fnClick }) => 
  <span className={`${classes.icon} material-icons-sharp`} onClick={ fnClick }>{ type }</span>;

export default Bookmark;
