import React from 'react';
import PropsType from 'prop-types';

// Data = {data: {}, headers = [],  classes = ''}
export default class Table extends React.Component {
  render() {
    return (Object.keys(this.props.data)?.length || this.props.headers.length) && (
      <table className={`table ${this.props.classes}`}>
        { this.props.headers.length && (
            <thead>
              <tr>
                { this.props.headers.map((title, i) => <th scope='col' key={ i }>{ title }</th>) }
              </tr>
            </thead>)}
        { Object.keys(this.props.data).length && (
          <tbody>
              { Object.entries(this.props.data).map(([trId, tr]) => (
                <tr key={ trId }>
                  { tr.map((td, tdI) => <td key={ tdI }>{ td }</td>) }
                </tr>))}        
          </tbody>)}
      </table>
    );
  }
}

Table.PropsType = {
  data: PropsType.object,
  headers: PropsType.array,
  classes: '',
};
