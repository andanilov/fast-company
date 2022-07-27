import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNumStrEnd } from '../utils/getNumStrEnd';
import { setCurrentPage } from '../store/usersSlice';
import config from '../conf';
import { getPaginatedData } from '../utils/getPaginatedData';

export default function useUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const currentPage = useSelector((state) => state.users.currentPage);

  const renderPhrase = (number) => (
    number > 0
      ? `${number} человек${getNumStrEnd(number)} тусан${
        number % 10 === 1 ? 'ёт' : 'ут'
      } с тобой сегодня!`
      : 'Forever Alone :(');

  const paginationParams = {
    currentPage,
    count: users.length,
    pageSize: config.USERS_ON_PAGE,
    onPageChange: (page) => dispatch(setCurrentPage(page)),
  };

  const getPaginatedUsers = getPaginatedData(users, currentPage, config.USERS_ON_PAGE);

  useEffect(() => {
    getPaginatedUsers.length < 1 && currentPage >= 2 && dispatch(setCurrentPage(currentPage - 1));
  }, [users]);

  return { renderPhrase, paginationParams, getPaginatedUsers };
}
