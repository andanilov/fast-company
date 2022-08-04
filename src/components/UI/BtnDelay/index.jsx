import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Btn from '../Btn';

const BtnDelay = ({ children, fnClick, delay, ...attr }) => {
  const [time, setTime] = useState(null);

  const timer = () => {
    console.log('--');
    console.log('Timer inside: ', time);
    setTimeout(() => {
      setTime((prevState) => prevState - 1);
      timer();
    }, 1000);
  };

  useEffect(() => {
    console.log('useEffect inside: ', time);
    console.log('--');
  }, [time]);

  return (
    <Btn
      fnClick={() => {
        setTime(delay);
        timer(delay);
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
