import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getAvatarSrcById from '../../../../../utils/getAvatarSrcById';

const UserInfo = ({ _id, name, sex, profession, rate }) => (
  <>
    <div className="text-end">
      <Link to="edit" className="text-decoration-none"><i className="bi bi-gear">&#9881;</i></Link>
    </div>
    <div className="d-flex flex-column align-items-center text-center position-relative">
      <img
        src={getAvatarSrcById(_id, sex)}
        className="rounded-circle"
        width="50%"
        alt={name}
      />
      <div className="mt-3">
        <h4>{name}</h4>
        <p className="text-secondary mb-1">{profession}</p>
        <div className="text-muted">
          <i className="bi bi-caret-down-fill text-primary" role="button">&#9660;</i>
          <i className="bi bi-caret-up text-secondary" role="button">&#9650;</i>
          <span className="ms-2">{rate}</span>
        </div>
      </div>
    </div>
  </>
);

UserInfo.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  sex: PropTypes.string,
};

UserInfo.defaultProps = {
  sex: '',
};

export default UserInfo;
