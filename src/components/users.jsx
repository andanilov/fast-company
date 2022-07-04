import React, { useState } from 'react';
import api from '../api';
import getNumStrEnd from './strNumberEnding';

const Users = () => {
  const [users, setUsers] = useState(api?.users.fetchAll());

  // -- Phrase output
  const renderPhrase = (number) => (
    <div className={`alert text-center fs-3 alert-${['dark', 'danger', 'warning', 'warning'][number] || 'success'}`} role="alert">
      { number > 0 
        ? `${number} человек${getNumStrEnd(number)} тусан${number % 10 === 1 ? 'ёт' : 'ут'} с тобой сегодня!`
        : `Forever Alone :(` }
    </div>);

  // -- Table output
  const renderTable = () => users.length > 0 && (
      <table className='table table-striped border text-center'>
        <thead>
        <tr>
          <th scope='col'>Имя</th>
          <th scope='col'>Качества</th>
          <th scope='col'>Профессия</th>
          <th scope='col'>Встретился [раз]</th>
          <th scope='col'>Оценка</th>
          <th scope='col'></th>
        </tr>
        </thead>    
        <tbody>
          { renderRows() }
        </tbody>
      </table>);

  // -- Row output
  const renderRows = () => users.map(({ _id, name, qualities, profession, completedMeetings, rate }) => (
    <tr key={ _id }>
      <td>{ name }</td>
      <td>{ renderQualities(qualities) }</td>
      <td>{ profession.name }</td>
      <td>{ completedMeetings }</td>
      <td>{ rate } / 5</td>
      <td>{ renderDeleteButton(_id) }</td>
    </tr>
  ));
  
  // -- Qualities output
  const renderQualities = (qualities) => qualities.map(({ _id, name, color }) => (
    <span key={ _id } className={ `badge m-1 pb-2 bg-${color}` }>
      { name }
    </span>));
 
  // -- Delete button output
  const renderDeleteButton = (id) => <button type='button' className='btn btn-danger' onClick={() => handleDelete(id)}>Удалить</button>;

  // -- Delete user from list
  const handleDelete = (id) => setUsers((prevUsers) => prevUsers.filter(({_id}) => _id !== id));

  return (
    <div className='p-4'>
      { renderPhrase(users.length) }
      { renderTable() }
    </div>
  );
}

export default Users;
