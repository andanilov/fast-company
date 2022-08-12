import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';

export default function NavBar() {
  const links = useMemo(() => ([
    { to: '/', title: 'Главная' },
    { to: '/login', title: 'Логин' },
    { to: '/users', title: 'Пользователи' },
  ]), []);

  return (
    <header className={classes.header}>
      {links.map(({ to, title }) =>
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => (isActive ? classes.active : '')}
        >
          {title}
        </NavLink>)}
    </header>
  );
}
