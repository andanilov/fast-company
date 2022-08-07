import React, { useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../../components/Wrapper';

// -- Alert
// --- Alert/index (context) -----------------------------------------
const ACntxt = React.createContext();

const useAlert = () => useContext(ACntxt);

const AlertContext = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState();
  const toToggle = (msg = '', tp = null) => {
    setMessage((prev) => (prev ? '' : msg));
    setType(tp);
  };

  const Alrt = useMemo(() => ({ message, toToggle, type }), [message, type]);

  return (
    <ACntxt.Provider value={Alrt}>
      {children}
    </ACntxt.Provider>
  );
};

AlertContext.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]).isRequired,
};

// -- Alert/Alert -----------------------------------------
const Alert = () => {
  const { message, type } = useAlert();

  return !!message && (
    <div className={`p-2 bg-red-100 text-2xl ${type || ''}`}>
      {message}
    </div>
  );
};

// -- Body -----------------------------------------
const Body = () => {
  const { toToggle } = useAlert();

  return (
    <div className="m-2">
      <h1 className="text-3xl">This is Body</h1>
      <button
        className="m-4 text-3xl p-2 bg-stone-200"
        type="button"
        onClick={() => toToggle('Текст из Body', 'info')}
      >
        Show Alert!
      </button>
    </div>
  );
};

// - Main -----------------------------------------
export default function Context() {
  // const [alertVisible, setAlertVisible] = useState(false);
  // console.log('Context!');

  return (
    <Wrapper>
      <div className="p-4">
        <AlertContext>
          <Alert />
          <Body />
        </AlertContext>
      </div>
    </Wrapper>
  );
}
