import React from 'react';
import PropTypes from 'prop-types';

// interface IValue {
//   _id: string,
//   name: string,
// };
//

const Select = ({ value, list, onChange, name, error, ...rest }) => (
  <select
    name={name}
    onChange={onChange}
    className={`form-control ${error ? 'is-invalid' : ''}`}
    defaultValue={value}
    {...rest}
  >
    <option value={[]}>Выбор...</option>
    {!!list.length && list.map(({ _id, name }) => <option key={_id} value={_id}>{name}</option>)}
  </select>);

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  list: PropTypes.oneOfType([PropTypes.array]),
  error: PropTypes.string,
};

Select.defaultProps = {
  name: '',
  value: '',
  onChange: () => {},
  list: [],
  error: '',
};

export default Select;
