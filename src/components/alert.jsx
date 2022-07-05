import React from 'react';
import PropsType from 'prop-types';

export default class Alert extends React.Component {
  render() {
    return (
      <div className={`alert text-center fs-3 alert-${this.props.type}`} role='alert'>
          { this.props.text }
      </div>);
  }
}

Alert.PropsType = {
  type: 'success',
  text: PropsType.string,
};
