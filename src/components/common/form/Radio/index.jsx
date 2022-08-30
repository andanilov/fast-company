import React from 'react';
import PropTypes from 'prop-types';

// interface IValue {
//   _id: string,
//   name: string,
// };
//

const Radio = ({ value, list, onChange, name }) => (
  !!list.length && list.map(({ _id, name: label }) => (
    <div key={_id} className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name={name}
        id={`radio${_id}`}
        value={_id}
        checked={_id === value}
        onChange={onChange}
      />
      <label
        className="form-check-label"
        htmlFor={`radio${_id}`}
      >
        {label}
      </label>
    </div>)));

Radio.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  list: PropTypes.oneOfType([PropTypes.array]),
};

Radio.defaultProps = {
  name: '',
  value: '',
  onChange: () => {},
  list: [],
};

export default Radio;
