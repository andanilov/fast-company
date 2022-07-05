import React from 'react';

// props.nameColors = [{name, color}]
export default function (props) {
    return props?.nameColors && props.nameColors.map(({ name, color }, i) => (
      <span key={ i } className={ `badge m-1 pb-2 bg-${color}` }>
        { name }
      </span>));
  }
