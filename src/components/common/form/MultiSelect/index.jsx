import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

// interface IValue {
//   _id: string,
//   name: string,
// };
//
const prepareSelectFormat = (list) => list.length && list.map(({ _id, name }) =>
  ({ value: _id, label: name }));

const prepareCommonFormat = (list) => (list?.length
  ? list.map(({ value, label }) => ({ _id: value, name: label }))
  : []);

const MultiSelect = ({ list, value, onChange, error }) => (
  <Select
    className={`form-control ${error ? 'is-invalid' : ''}`}
    isMulti
    defaultValue={prepareSelectFormat(value)}
    options={prepareSelectFormat(list)}
    onChange={(value) => {
      console.log('! - ', value);
      onChange({ target: { value: prepareCommonFormat(value) } });
    }}
  />);

MultiSelect.propTypes = {
  list: PropTypes.oneOfType([PropTypes.array]),
  value: PropTypes.oneOfType([PropTypes.array]),
  onChange: PropTypes.func,
  error: PropTypes.string,
};

MultiSelect.defaultProps = {
  list: [],
  value: [],
  onChange: () => {},
  error: '',
};

export default MultiSelect;
