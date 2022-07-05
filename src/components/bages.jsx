import React from 'react';
import PropsType from 'prop-types';

// props.nameColors = [{name, color}]
export default class Bages extends React.Component {
  render() {
    return this.props.nameColors && this.props.nameColors.map(({ name, color }, i) => (
      <span key={ i } className={ `badge m-1 pb-2 bg-${color}` }>
        { name }
      </span>));
  }  
}

Bages.PropsType = {
  nameColors : PropsType.array
};