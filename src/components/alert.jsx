import React from 'react';
import PropsType from 'prop-types';

const Alert = ({ type, text }) => {
    return (
      <div className={`alert text-center fs-3 alert-${type}`} role='alert'>
          { text }
      </div>);
  
}

Alert.PropsType = {
  type: 'success',
  text: PropsType.string,
};

export default Alert;
