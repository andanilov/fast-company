import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classes from './Table.module.css';

const Table = ({ data, headers }) =>
  (Object.keys(data)?.length || headers.length) && (
    <table className={classes.table}>
      {headers.length && (
        <thead>
          <tr>
            {headers.map((title, i) => (
              <th scope="col" key={i}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
      )}
      {Object.keys(data).length && (
        <TransitionGroup component="tbody">
          {Object.entries(data).map(([trId, tr]) => (
            <CSSTransition key={trId} timeout={500} classNames={{ ...classes }}>
              <tr>
                {tr.map((td, tdI) => (
                  <td key={tdI}>{td}</td>
                ))}
              </tr>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </table>
  );

Table.propTypes = {
  data: PropTypes.instanceOf(Object),
  headers: PropTypes.instanceOf(Array),
};

Table.defaultProps = {
  data: {},
  headers: [],
};

export default Table;
