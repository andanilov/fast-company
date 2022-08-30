import React from 'react';
import PropTypes from 'prop-types';
import classes from './UserCard.module.css';

import Badges from '../../../common/Badges';

const UserCard = ({ name, profession, qualities, completedMeetings, rate }) => (
  <ul className={classes.card}>
    <li><h1>{name}</h1></li>
    <li><h2>{`Профессия: ${profession.name}`}</h2></li>
    {qualities.length && <li><Badges nameColors={qualities} /></li>}
    <li>{`Встретился [раз]: ${completedMeetings}`}</li>
    {rate && <li>{`Рейтинг: ${rate} / 5`}</li>}
  </ul>
);

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  profession: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }),
  qualities: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
  })),
  completedMeetings: PropTypes.number,
  rate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

UserCard.defaultProps = {
  profession: {},
  qualities: [],
  completedMeetings: 0,
  rate: false,
};

export default UserCard;
