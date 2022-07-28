import React from 'react';
import classes from './Loading.module.css';

const Loading = () => (
  <div className={classes.loader}>
    <div className={classes.square}> </div>
    <div className={classes.square}> </div>
    <div className={`${classes.square} ${classes.last}`}> </div>
    <div className={`${classes.square} ${classes.clear}`}> </div>
    <div className={classes.square}> </div>
    <div className={`${classes.square} ${classes.last}`}> </div>
    <div className={`${classes.square} ${classes.clear}`}> </div>
    <div className={classes.square}> </div>
    <div className={`${classes.square} ${classes.last}`}> </div>
  </div>
);

export default Loading;
