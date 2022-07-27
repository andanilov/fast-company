import React from 'react';
import { useSelector } from 'react-redux';
import useUsers from '../../hooks/useUsers';

import UsersTable from '../UsersTable';
import Alert from '../UI/Alert';
import Pagination from '../UI/Pagination';

const Users = () => {
  const users = useSelector((state) => state.users.users);

  const { renderPhrase, paginationParams, getPaginatedUsers } = useUsers();

  return (
    <section>
      <aside>Фильтр</aside>
      <section>
        <div>
          <Alert
            text={renderPhrase(users.length)}
            type={['info', 'danger', 'warning', 'warning'][users.length] || 'success'}
          />
        </div>
        <div>panel</div>
        <Pagination {...paginationParams} />
        <UsersTable users={getPaginatedUsers} />
        <Pagination {...paginationParams} />
      </section>
    </section>
  );
};

export default Users;

// import { setUsers } from '../../store/usersSlice';
// import api from '../../api';
// import classes from './Users.module.css';

// // -- UI --
// import Badges from '../UI/Badges';
// import Alert from '../UI/Alert';
// import Table from '../UI/Table';
// import Btn from '../UI/Btn';
// import Icon from '../UI/Icon';
// import Pagination from '../UI/Pagination';

// // -- Utilites
// import { getNumStrEnd } from '../../utils/getNumStrEnd';
// import { getPaginatedData } from '../../utils/getPaginatedData';

// // -- Preferences
// const usersOnPage = 4;

// const Users = () => {
//   // -- Global store
//   // const dispatch = useDispatch();
//   const userFromSlice = useSelector((state) => state.users.users);

//   const [users, setUsers] = useState(api?.users.fetchAll());
//   const [currentPage, setCurrentPage] = useState(1);

//   // -- Get Phrase
//   const renderPhrase = (number) => (
//     number > 0
//       ? `${number} человек${getNumStrEnd(number)} тусан${
//         number % 10 === 1 ? 'ёт' : 'ут'
//       } с тобой сегодня!`
//       : 'Forever Alone :(');

//   // -
//   // - HANDLERS
//   // -- Delete user from list
//   const handleDelete = (id) =>
//     setUsers((prevUsers) => prevUsers.filter(({ _id }) => _id !== id));

//   // -- Change Page
//   const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);

//   // -- Change User param
//   const changeUserParam = (id, paramTitle, newValue) =>
//     setUsers((prevUsers) =>
//       prevUsers.map((user) => {
//         user._id === id && (user[paramTitle] = newValue);
//         return user;
//       }));

//   // -
//   // - PAGINATION
//   // -- Users pagination
//   const usersCrop = getPaginatedData(users, currentPage, usersOnPage);

//   // -- Fix delete all users from last page
//   usersCrop.length < 1 && currentPage >= 2 && setCurrentPage(currentPage - 1);

//   const usersPaginationParams = {
//     currentPage,
//     count: users.length,
//     pageSize: usersOnPage,
//     onPageChange: handlePageChange,
//   };

//   // -
//   // - RENDER
//   // -- Users info for table output
//   const usersForTable = usersCrop.reduce((
//     usersTable,
//     { _id, name, qualities, profession, completedMeetings, rate, bookmark },
//   ) => {
//     usersTable[_id] = [
//       name,
//       <Badges key={_id} nameColors={qualities} />,
//       profession.name,
//       completedMeetings,
//       `${rate} / 5`,
//       <Icon
//         key={_id}
//         type={bookmark ? 'bookmark_added' : 'bookmark_border'}
//         fnClick={() => changeUserParam(_id, 'bookmark', !bookmark)}
//       />,
//       <Btn
//         key={_id}
//         text="Удалить"
//         type="delete"
//         fnClick={() => handleDelete(_id)}
//       />,
//     ];
//     return usersTable;
//   }, {});

//   // -- Users table headers titles
//   const usersForTableHeaders = [
//     'имя',
//     'Качества',
//     'Профессия',
//     'Встретился [раз]',
//     'Оценка',
//     'Избранное',
//     '',
//   ];

//   return (
//     <div className="p-4">
//       <Alert
//         text={renderPhrase(users.length)}
//         type={['info', 'danger', 'warning', 'warning'][users.length] || 'success'}
//       />

//       <div className={classes.paginationArea}>
//         <Pagination {...usersPaginationParams} />
//       </div>

//       {usersCrop.length > 0 && <Table data={usersForTable} headers={usersForTableHeaders} />}

//       <div className={classes.paginationArea}>
//         <Pagination {...usersPaginationParams} />
//       </div>
//     </div>
//   );
// };

// export default Users;
