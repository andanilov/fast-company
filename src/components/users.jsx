import React, { useState } from 'react';
import api from '../api';

// -- Components --
import Bages from './Bages';
import Alert from './Alert';
import Table from './Table';
import Btn from './Btn';

import { getNumStrEnd } from '../utils';

const Users = () => {
  const [users, setUsers] = useState(api?.users.fetchAll());

  // -- Get Phrase
  const renderPhrase = (number) => number > 0 
    ? `${number} человек${getNumStrEnd(number)} тусан${number % 10 === 1 ? 'ёт' : 'ут'} с тобой сегодня!`
    : 'Forever Alone :(';
   
  // -- Delete user from list
  const handleDelete = (id) => setUsers((prevUsers) => prevUsers.filter(({_id}) => _id !== id));

  // -- Users info for table output
  const usersForTable = 
    users.reduce((usersTable, { _id, name, qualities, profession, completedMeetings, rate }) => {
      usersTable[_id] = [
        name,
        <Bages key={_id} nameColors={qualities}/>,
        profession.name,
        completedMeetings,
        `${rate} / 5`,
        <Btn key={_id} text='Удалить' type='danger' fnClick={() => handleDelete(_id)}/>,
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
    '',];    

  return (
    <div className='p-4'>
      <Alert text={renderPhrase(users.length)} type={['dark', 'danger', 'warning', 'warning'][users.length] || 'success'}/>
      { users.length > 0 && <Table data={usersForTable} headers={usersForTableHeaders} classes='text-center' />}
    </div>
  );
}

export default Users;
