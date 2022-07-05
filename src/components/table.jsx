import React from 'react';
import PropsType from 'prop-types';

const Table = ({ data, headers, classes }) =>
  (Object.keys(data)?.length || headers.length) && (
    <table className={`table ${classes}`}>
      { headers.length && (
          <thead>
            <tr>
              { headers.map((title, i) => <th scope='col' key={ i }>{ title }</th>) }
            </tr>
          </thead>)}
      { Object.keys(data).length && (
        <tbody>
            { Object.entries(data).map(([trId, tr]) => (
              <tr key={ trId }>
                { tr.map((td, tdI) => <td key={ tdI }>{ td }</td>) }
              </tr>))}        
        </tbody>)}
    </table>
  );

Table.PropsType = {
  data: PropsType.object,
  headers: PropsType.array,
  classes: '',
};

export default Table;
