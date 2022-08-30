import React from 'react';
import PropTypes from 'prop-types';
import classes from './mainLayout.module.css';

import NavBar from '../../components/UI/NavBar';

const MainLayout = ({ children }) => (
  <section className={classes.pageArea}>
    <NavBar />
    { children }
  </section>
);

MainLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default MainLayout;
