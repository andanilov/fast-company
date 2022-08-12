import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/UI/Loading';
import useUsers from '../../hooks/useUsers';
import classes from './User.module.css';

import Badges from '../../components/UI/Badges';

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const { getUserById } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () { setUser(await getUserById(userId)); }());
    return () => { setUser(); };
  }, [userId]);

  return (
    !user
      ? <Loading screen />
      : (
        <>
          <ul className={classes.card}>
            <li><h1>{user.name}</h1></li>
            <li><h2>{`Профессия: ${user.profession.name}`}</h2></li>
            {user?.qualities && <li><Badges nameColors={user.qualities} /></li>}
            <li>{`Встретился [раз]: ${user?.completedMeetings}`}</li>
            {user?.rate && <li>{`Рейтинг: ${user.rate} / 5`}</li>}
          </ul>

          <button
            onClick={() => navigate('/users', { replace: false })}
            type="button"
          >
            Вернуться
          </button>
        </>)
  );
}
