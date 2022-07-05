import React from "react";
import PropsType from 'prop-types';

// props = [text, fnClick]
export default class Btn extends React.Component {
  render() {
    return <button type='button' className={`btn btn-${this.props.type}`} onClick={this.props.fnClick}>{ this.props.text }</button>;
  }
}

Btn.PropsType = {
  text: PropsType.string,
  type: 'success',
  fnClick: PropsType.func,
}
