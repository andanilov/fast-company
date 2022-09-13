import React from 'react';
import PropTypes from 'prop-types';
import classes from './Loading.module.css';

const Loading = ({ screen, inline }) => (
  <div className={`${screen ? classes.screen : ''} ${inline ? classes.inline : ''}`}>
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
  </div>
);

Loading.propTypes = {
  screen: PropTypes.bool,
  inline: PropTypes.bool,
};

Loading.defaultProps = {
  screen: false,
  inline: false,
};

export default Loading;
