import React from 'react';
import { useSelector } from 'react-redux';
import useUsers from '../../hooks/useUsers';
import classes from './UserTablePanel.module.css';

import Pagination from '../UI/Pagination';
import Input from '../UI/Input';

const UserTablePanel = () => {
  const searchStr = useSelector((state) => state.users.searchStr);

  const {
    paginationParams,
    changeSearchStr,
  } = useUsers();

  return (
    <div className={classes.panel}>
      <div>
        <Input
          value={searchStr}
          placeholder="поиск по имени"
          fnChange={changeSearchStr}
        />
      </div>
      <Pagination {...paginationParams} />
    </div>);
};

export default UserTablePanel;
