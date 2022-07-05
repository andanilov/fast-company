import React from "react";

export default function (text, type = 'success', fnClick = () => {}, ) {
  return <button type='button' className={`btn btn-${type}`} onClick={fnClick}>{ text }</button>;
}
