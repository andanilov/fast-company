import React from "react";

// props = [text, fnClick]
export default function (props) {
  return <button type='button' className={`btn btn-${props?.type || 'success'}`} onClick={props?.fnClick}>{ props?.text }</button>;
}
