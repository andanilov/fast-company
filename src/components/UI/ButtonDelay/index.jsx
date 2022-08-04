import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../Btn';

const ButtonDelay = ({ delay, delayText, children, fnClick, ...attr }) => {
  const [isTimer, setIsTimer] = useState(false); // Is timer alive?
  const [ntrvl, setNtrvl] = useState(null); // Current interval id
  const [time, setTime] = useState(delay); // Current seconds left to apply

  // --
  // -- METHODS
  const counter = () => setInterval(() => setTime((prevState) => prevState - 1), 1000);
  const killCounter = (counterId) => {
    clearInterval(counterId);
    setTime(delay);
    setIsTimer(false);
  };

  // --
  // -- HOOKS
  // Start or cancel timer
  useEffect(() => {
    isTimer ? setNtrvl(counter()) : (ntrvl && killCounter(ntrvl));
  }, [isTimer]);

  // -- Apply click function
  useEffect(() => {
    if (time <= 0) {
      killCounter(ntrvl);
      fnClick();
    }
  }, [time]);

  return (
    <Button fnClick={() => setIsTimer((prevState) => !prevState)} {...attr}>
      {isTimer ? `${delayText} ${time}` : children}
    </Button>);
};

ButtonDelay.propTypes = {
  delay: PropTypes.number,
  delayText: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  type: PropTypes.string,
  fnClick: PropTypes.func,
};

ButtonDelay.defaultProps = {
  delay: 0,
  delayText: 'Отменить',
  type: 'success',
  fnClick: () => {},
};

export default ButtonDelay;
