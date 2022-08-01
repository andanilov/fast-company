import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserParamById, deleteUserById, setCurrentSort } from '../../store/usersSlice';

import Badges from '../UI/Badges';
import Icon from '../UI/Icon';
import Btn from '../UI/Btn';
import Table from '../UI/Table';

const UsersTable = ({ users }) => {
  // -- Global state
  const dispatch = useDispatch();
  const currentSort = useSelector((state) => state.users.currentSort);

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
      name,
      <Badges key={_id} nameColors={qualities} />,
      profession.name,
      completedMeetings,
      `${rate} / 5`,
      <Icon
        key={_id}
        type={bookmark ? 'bookmark_added' : 'bookmark_border'}
        fnClick={() => dispatch(updateUserParamById({ _id, param: 'bookmark', value: !bookmark }))}
      />,
      <Btn
        key={_id}
        type="delete"
        fnClick={() => dispatch(deleteUserById({ _id }))}
      >
        Удалить
      </Btn>,
    ];
    return usersTable;
  }, {});

  return <Table data={usersRows} headers={headerTableUsers} />;
};

UsersTable.propTypes = {
  users: PropTypes.instanceOf(Array),
};

UsersTable.defaultProps = {
  users: [],
};

export default UsersTable;
