import React from 'react';

export default function (text, style = 'success') {
  return <div className={`alert text-center fs-3 alert-${style}`} role='alert'>{ text }</div>;
}