import React from 'react';

// Data = {data: {}, headers = [],  classes = ''}
export default function (props) {
  return (Object.keys(props?.data)?.length || props?.headers.length) && (
    <table className={`table ${props?.classes}`}>
      { props?.headers.length && (
          <thead>
            <tr>
              { props?.headers.map((title, i) => <th scope='col' key={ i }>{ title }</th>) }
            </tr>
           </thead>)}
      { Object.keys(props?.data).length && (
        <tbody>
            { Object.entries(props?.data).map(([trId, tr]) => (
              <tr key={ trId }>
                { tr.map((td, tdI) => <td key={ tdI }>{ td }</td>) }
              </tr>))}        
        </tbody>)}
    </table>
  );
}
