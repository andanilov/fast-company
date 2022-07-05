import React from "react";
import PropsType from 'prop-types';

const Btn = ({ text, type, fnClick}) => 
  <button type='button' className={`btn btn-${type}`} onClick={fnClick}>{ text }</button>;

Btn.PropsType = {
  text: PropsType.string,
  type: 'success',
  fnClick: PropsType.func,
}

export default Btn;
