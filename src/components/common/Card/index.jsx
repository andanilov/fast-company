import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, subTitle, children, align }) => (
  <div className={`card text-${align}`}>
    <div className="card-body">
      {!!title && <h5 className="card-title">{title}</h5>}
      {!!subTitle && <h6 className="card-subtitle mb-2 text-muted">{subTitle}</h6>}
      {children}
    </div>
  </div>
);

Card.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  align: PropTypes.string,
};

Card.defaultProps = {
  title: '',
  subTitle: '',
  children: '',
  align: 'center',
};

export default Card;
