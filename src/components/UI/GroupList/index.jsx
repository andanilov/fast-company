import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import classes from './GroupList.module.css';

const GroupList = ({ title, items, keyProp, valProp, currIds, fnClick }) =>
  Object.entries(items)?.length && (
    <>
      {title && <div className={classes.title}>{title}</div>}
      <ul className={classes.group}>
        {Object.entries(items).map(([id, val]) =>
          <li
            key={val[keyProp] ?? id}
            className={clsx({
              [classes.selected]: currIds.includes(val[keyProp] ?? id),
              [classes.empty]: val?.sup === 0,
            })}
            onClick={() => fnClick(val[keyProp] ?? id)}
          >
            {val[valProp]}
            {val?.sup ? <sup>{val.sup}</sup> : ''}
          </li>)}
      </ul>
    </>
  );

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  keyProp: PropTypes.string,
  valProp: PropTypes.string,
  currIds: PropTypes.instanceOf(Array),
  fnClick: PropTypes.func,
};

GroupList.defaultProps = {
  title: '',
  items: {},
  keyProp: '_id',
  valProp: 'name',
  currIds: [],
  fnClick: () => {},
};

export default GroupList;
