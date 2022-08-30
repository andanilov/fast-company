import React from 'react';
import PropTypes from 'prop-types';

const LableWrapper = ({ name, label, Element, error, ...options }) => (
  <div className="form-group my-3 input-group-lg">
    <label htmlFor={name} className="d-block">{label}</label>
    <Element name={name} error={error} {...options} />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

LableWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  Element: PropTypes.func.isRequired,
  error: PropTypes.string,
};

LableWrapper.defaultProps = {
  name: `input${String(Math.random()).slice(2)}${Date.now()}`,
  error: '',
};

export default LableWrapper;
