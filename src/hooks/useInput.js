import { useState } from 'react';

export default function (defaultValue = '') {
  const [value, setValue] = useState(defaultValue);
  const [error, setErrorValue] = useState('');

  return {
    inline: {
      value,
      error,
      onChange: (event) => setValue(event.target.value),
    },
    setValue: (value) => setValue(value),
    setError: (value) => {
      setErrorValue(value);
      return value;
    },
  };
}
