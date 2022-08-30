import React from 'react';
import { useSelector } from 'react-redux';
import useUsers from '../../../../hooks/useUsers';
import classes from './UserTablePanel.module.css';

import Pagination from '../../../common/Pagination';
import Input from '../../../common/form/Input';

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
          onChange={(event) => changeSearchStr(event.target.value)}
        />
      </div>
      <Pagination {...paginationParams} />
    </div>);
};

export default UserTablePanel;
