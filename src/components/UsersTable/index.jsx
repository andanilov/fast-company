import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateUserParamById, deleteUserById } from '../../store/usersSlice';

import Badges from '../UI/Badges';
import Icon from '../UI/Icon';
import Btn from '../UI/Btn';
import Table from '../UI/Table';

// -- Header table users
const headerTableUsers = [
  'имя',
  'Качества',
  'Профессия',
  'Встретился [раз]',
  'Оценка',
  'Избранное',
  '',
];

const UsersTable = ({ users }) => {
  // -- Global state
  const dispatch = useDispatch();

  // -- If no users
  if (!users.length) {
    return '';
  }

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
