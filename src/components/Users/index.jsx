import React from 'react';
import { useSelector } from 'react-redux';
import classes from './Users.module.css';
import useUsers from '../../hooks/useUsers';

import UsersTable from '../UsersTable';
import Alert from '../UI/Alert';
import Pagination from '../UI/Pagination';
import Loading from '../UI/Loading';
import GroupList from '../UI/GroupList';
import Btn from '../UI/Btn';

const Users = () => {
  const users = useSelector((state) => state.users.users);
  const professions = useSelector((state) => state.users.professions);
  const currProfessions = useSelector((state) => state.users.currProfessions);

  const {
    renderPhrase,
    paginationParams,
    getPaginatedUsers,
    togleCurrProf,
    clearCurrProf,
  } = useUsers();

  return (
    <section className={classes.section}>
      <aside>
        {professions === null
          ? <Loading />
          : <>
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
        {users === null
          ? <Loading />
          : (
            <>
              <div>
                <Alert
                  text={renderPhrase(users.length)}
                  type={['info', 'danger', 'warning', 'warning'][users.length] || 'success'}
                />
              </div>
              <Pagination {...paginationParams} />
              <UsersTable users={getPaginatedUsers} />
              <Pagination {...paginationParams} />
            </>)}
      </section>
    </section>
  );
};

export default Users;
