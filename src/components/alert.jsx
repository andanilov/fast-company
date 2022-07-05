import React from 'react';

// props = [text, type]
export default function (props) {
  return (
    <div className={`alert text-center fs-3 alert-${props?.type || 'success'}`} role='alert'>
        { props?.text }
    </div>);
}