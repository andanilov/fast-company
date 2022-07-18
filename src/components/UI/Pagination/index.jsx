import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classes from './Pagination.module.css';

const Pagination = ({ currentPage, count, pageSize, onPageChange }) =>
  pageSize < count && (
    <nav className={classes.nav}>
      <ul>
        <li>страницы: </li>
        {_.range(1, Math.ceil(count / pageSize) + 1).map((page) => (
          <li
            className={currentPage === page ? classes.active : ''}
            key={`page_${page}`}
          >
            <button type="button" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
