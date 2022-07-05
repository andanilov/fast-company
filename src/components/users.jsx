import React, { useState } from 'react';
import api from '../api';

import alert from './alert';
import table from './table';
import bages from './bages';
import btn from './btn';
import getNumStrEnd from './strNumberEnding';

const Users = () => {
  // -- Get data
  const [users, setUsers] = useState(api?.users.fetchAll());

  // -- Qualities output
  const renderQualities = (qualities) => bages(qualities);
  
  // -- Delete button output
  const renderDeleteButton = (id) => btn('Удалить', 'danger', () => handleDelete(id));

  // -- Get Phrase
  const renderPhrase = (number) => number > 0 
    ? `${number} человек${getNumStrEnd(number)} тусан${number % 10 === 1 ? 'ёт' : 'ут'} с тобой сегодня!`
    : 'Forever Alone :(';
   
  // -- Delete user from list
  const handleDelete = (id) => setUsers((prevUsers) => prevUsers.filter(({_id}) => _id !== id));

  // -- Users info for table output
  const usersForTable = 
    users.reduce((usersTable, { _id, name, qualities, profession, completedMeetings, rate }) => {
      usersTable[String(_id)] = [
        name,
        renderQualities(qualities),
        profession.name,
        completedMeetings,
        `${rate} / 5`,
        renderDeleteButton(_id)
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
 
  // -- User table Render    
    const renderTable = () => users.length > 0 && table(
      usersForTable,
      usersForTableHeaders,
      'table-striped border text-center',
    );

  return (
    <div className='p-4'>
      { alert(renderPhrase(users.length), ['dark', 'danger', 'warning', 'warning'][users.length] || 'success') }
      { renderTable() }
    </div>
  );
}

export default Users;
