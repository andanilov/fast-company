import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Btn from '../Btn';

const BtnDelay = ({ children, fnClick, delay, ...attr }) => {
  const [time, setTime] = useState(delay);
  var varTime = delay;

  const timer = () => {
    console.log('--');
    console.log('Timer [time/varTime]: ', time, varTime);
    setTimeout(() => {
      setTime((prevState) => prevState - 1);
      varTime -= 1;
      timer();
    }, 1000);
  };

  useEffect(() => {
    console.log('useEffect [time/varTime]: ', time, varTime);
    console.log('--');
  }, [time]);

  return (
    <Btn
      fnClick={() => {
        timer();
      }}
      {...attr}
    >
      {`${children} ${time ?? ''}`}
    </Btn>
  );
};

BtnDelay.propTypes = {
  fnClick: PropTypes.func,
  delay: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

BtnDelay.defaultProps = {
  fnClick: () => {},
  delay: 5,
};

export default BtnDelay;
