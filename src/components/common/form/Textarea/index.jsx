import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ value, onChange, name, error, ...rest }) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    className={`form-control ${error ? 'is-invalid' : ''}`}
    {...rest}
  />);

Textarea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

Textarea.defaultProps = {
  name: '',
  value: '',
  onChange: () => {},
  error: '',
};

export default Textarea;
