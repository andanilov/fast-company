import React from 'react';

// bages = [{name, color}]
export default function (bages = []) {
  return bages.map(({ name, color }, i) => (
    <span key={ i } className={ `badge m-1 pb-2 bg-${color}` }>
      { name }
    </span>));
}