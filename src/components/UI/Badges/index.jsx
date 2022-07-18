import React from 'react';
import PropTypes from 'prop-types';
import classes from './Badges.module.css';

const Badges = ({ nameColors }) =>
  nameColors &&
  nameColors.map(({ name, color }, i) => (
    <span
      key={i}
      className={`badge m-1 pb-2 ${classes.badge} ${classes[color]}`}
    >
      {name}
    </span>
  ));

Badges.propTypes = {
  nameColors: PropTypes.instanceOf(Array),
};

export default Badges;
