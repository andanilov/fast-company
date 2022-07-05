import React from 'react';
import PropsType from 'prop-types';

const Bages = ({ nameColors }) => 
  nameColors && nameColors.map(({ name, color }, i) => (
    <span key={ i } className={ `badge m-1 pb-2 bg-${color}` }>
      { name }
    </span>));

Bages.PropsType = {
  nameColors : PropsType.array
};

export default Bages;
