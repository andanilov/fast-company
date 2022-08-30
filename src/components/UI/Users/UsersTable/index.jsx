import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserParamById, setCurrentSort, deleteUserById } from '../../../../store/usersSlice';
import useUsers from '../../../../hooks/useUsers';

import Badges from '../../../common/Badges';
import Icon from '../../../common/Icon';
import BtnDelay from '../../../common/form/BtnDelay';
import Table from '../../../common/Table';

const UsersTable = () => {
  // -- Global state
  const dispatch = useDispatch();
  const currentSort = useSelector((state) => state.users.currentSort);
  const { getPaginatedUsers: users } = useUsers();

  // -- If no users
  if (!users.length) {
    return '';
  }

  const changeSort = (col) => () => dispatch(setCurrentSort(
    currentSort?.col === col
      ? { col, type: ['asc', 'desc'][+(currentSort?.type === 'asc')] }
      : { col, type: 'asc' },
  ));

  // -- Header table users
  const headerTableUsers = [
    { title: 'имя', fnClick: changeSort('name'), sorted: currentSort?.col === 'name' ? currentSort.type : '' },
    { title: 'Качества' },
    { title: 'Профессия', fnClick: changeSort('profession.name'), sorted: currentSort?.col === 'profession.name' ? currentSort.type : '' },
    { title: 'Встретился [раз]', fnClick: changeSort('completedMeetings'), sorted: currentSort?.col === 'completedMeetings' ? currentSort.type : '' },
    { title: 'Оценка', fnClick: changeSort('rate'), sorted: currentSort?.col === 'rate' ? currentSort.type : '' },
    { title: 'Избранное', fnClick: changeSort('bookmark'), sorted: currentSort?.col === 'bookmark' ? currentSort.type : '' },
    { title: '' },
  ];

  // -- Prepare user list for table
  const usersRows = users.reduce((
    usersTable,
    { _id, name, qualities, profession, completedMeetings, rate, bookmark },
  ) => {
    usersTable[_id] = [
      <Link to={`/users/${_id}`}>{name}</Link>,
      <Badges key={_id} nameColors={qualities} />,
      profession.name,
      completedMeetings,
      `${rate} / 5`,
      <Icon
        key={_id}
        type={bookmark ? 'bookmark_added' : 'bookmark_border'}
        fnClick={() => dispatch(updateUserParamById({ _id, param: 'bookmark', value: !bookmark }))}
      />,
      <BtnDelay
        key={_id}
        type="delete"
        delay={3}
        fnClick={() => dispatch(deleteUserById({ _id }))}
      >
        Удалить
      </BtnDelay>,
    ];
    return usersTable;
  }, {});

  return <Table data={usersRows} headers={headerTableUsers} />;
};

export default UsersTable;
