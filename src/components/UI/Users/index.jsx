import React from 'react';
import { useSelector } from 'react-redux';
import classes from './Users.module.css';
import useUsers from '../../../hooks/useUsers';

import UsersTable from './UsersTable';
import UserTablePanel from './UserTablePanel';
import Alert from '../../common/Alert';
import Loading from '../../common/Loading';
import GroupList from '../../common/GroupList';
import Btn from '../../common/form/Btn';

const Users = () => {
  const users = useSelector((state) => state.users.users);
  const professions = useSelector((state) => state.users.professions);
  const currProfessions = useSelector((state) => state.users.currProfessions);

  const {
    renderPhrase,
    togleCurrProf,
    clearCurrProf,
  } = useUsers();

  return (
    <section className={classes.section}>
      {[professions, users].includes(null) && <Loading screen />}
      <aside>
        {professions !== null
          && <>
            <GroupList
              title="Профессии"
              items={professions}
              currIds={currProfessions}
              fnClick={(prof) => togleCurrProf(prof)}
            />
            {currProfessions?.length
              ? <Btn type="link" fnClick={clearCurrProf}>
                <>
                  Удалить фильтр
                  <sup>
                    {currProfessions?.length}
                  </sup>
                </>
              </Btn>
              : ''}
          </>}
      </aside>
      <section>
        {users !== null
          && (
            <>
              <div>
                <Alert
                  text={renderPhrase(users.length)}
                  type={['info', 'danger', 'warning', 'warning'][users.length] || 'success'}
                />
              </div>
              <UserTablePanel />
              <UsersTable />
              <UserTablePanel />
            </>)}
      </section>
    </section>
  );
};

export default Users;
