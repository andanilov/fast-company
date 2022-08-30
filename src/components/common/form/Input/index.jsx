import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, value, onChange, name, error, ...rest }) => (
  <input
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    className={`form-control ${error ? 'is-invalid' : ''}`}
    {...rest}
  />);

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

Input.defaultProps = {
  name: '',
  type: 'text',
  value: '',
  onChange: () => {},
  error: '',
};

export default Input;
