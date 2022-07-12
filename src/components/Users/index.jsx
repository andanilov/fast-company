import React, { useState } from 'react';
import api from '../../api';
// import classes from './Users.module.css';

// -- Components --
import Bages from '../UI/Bages';
import Alert from '../UI/Alert';
import Table from '../UI/Table';
import Btn from '../UI/Btn';
import Icon from '../UI/Icon';

import { getNumStrEnd } from '../../utils';

const Users = () => {
  const [users, setUsers] = useState(api?.users.fetchAll());

  // -- Get Phrase
  const renderPhrase = (number) => number > 0 
    ? `${number} человек${getNumStrEnd(number)} тусан${number % 10 === 1 ? 'ёт' : 'ут'} с тобой сегодня!`
    : 'Forever Alone :(';
   
  // -- Delete user from list
  const handleDelete = (id) => setUsers((prevUsers) => prevUsers.filter(({ _id }) => _id !== id));

  // --- Change User param
  const changeUserParam = (id, paramTitle, newValue) => setUsers((prevUsers) => 
    prevUsers.map((user) => {
        user._id === id && (user[paramTitle] = newValue);
        return user;
    }));

  // -- Users info for table output
  const usersForTable = 
    users.reduce((usersTable, { _id, name, qualities, profession, completedMeetings, rate, bookmark }) => {
      usersTable[_id] = [
        name,
        <Bages key={_id} nameColors={qualities}/>,
        profession.name,
        completedMeetings,
        `${rate} / 5`,
        <Icon 
          key={_id}
          type={ bookmark ? 'bookmark_added' : 'bookmark_border' }
          fnClick={ () => changeUserParam(_id, 'bookmark', !bookmark) }          
        />,
        <Btn
          key={_id}
          text='Удалить'
          type='delete'
          fnClick={() => handleDelete(_id)}
        />,
      ];
      return usersTable;
    }, {});

  // -- Users table headers titles
  const usersForTableHeaders = [
    'имя',
    'Качества',
    'Профессия',
    'Встретился [раз]',
    'Оценка',
    'Избранное',
    '',
  ];    

  return (
    <div className='p-4'>
      <Alert text={ renderPhrase(users.length) } type={['info', 'danger', 'warning', 'warning'][users.length] || 'success'}/>
      { users.length > 0 && <Table data={ usersForTable } headers={ usersForTableHeaders } />}
    </div>
  );
}

export default Users;
