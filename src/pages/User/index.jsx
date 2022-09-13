import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import useUsers from '../../hooks/useUsers';

import MainLayout from '../../layouts/MainLayout';
import Loading from '../../components/common/Loading';
import UserCard from '../../components/UI/Users/UserCard';
import UserEdit from '../../components/UI/Users/UserEdit';
// import Btn from '../../components/common/form/Btn';

export default function User({ edit }) {
  const { userId } = useParams();
  const [editMode, setEditMode] = useState();
  const [user, setUser] = useState();
  const { getUserById } = useUsers();

  useEffect(() => {
    setUser();
    (async function () { setUser(await getUserById(userId)); }());
    return () => { setUser(); };
  }, [userId, editMode]);

  useEffect(() => { setEditMode(edit); }, [edit]);

  return (
    <MainLayout>
      {!user
        ? <Loading screen />
        : (<>
          {editMode && <UserEdit {...user} />}
          {!editMode && (<>
            <UserCard {...user} />
            {/* <Link to="edit">Редактировать</Link> */}
          </>)}
        </>)}
    </MainLayout>
  );
}

User.propTypes = {
  edit: PropTypes.bool,
};

User.defaultProps = {
  edit: false,
};
