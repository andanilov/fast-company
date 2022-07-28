import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNumStrEnd } from '../utils/getNumStrEnd';
import { setUsers, setCurrentPage, setProfessions, setCurrProfessions, setUsersOriginal } from '../store/usersSlice';
import config from '../conf';
import api from '../api';
import { getPaginatedData } from '../utils/getPaginatedData';

export default function useUsers() {
  const dispatch = useDispatch();
  const usersOriginal = useSelector((state) => state.users.usersOriginal);
  const users = useSelector((state) => state.users.users);
  const currentPage = useSelector((state) => state.users.currentPage);
  const professions = useSelector((state) => state.users.professions);
  const currProfessions = useSelector((state) => state.users.currProfessions);

  const renderPhrase = (number) => (
    number > 0
      ? `${number} человек${getNumStrEnd(number)} тусан${
        number % 10 === 1 ? 'ёт' : 'ут'
      } с тобой сегодня!`
      : 'Forever Alone :(');

  const paginationParams = {
    currentPage,
    count: users?.length,
    pageSize: config.USERS_ON_PAGE,
    onPageChange: (page) => dispatch(setCurrentPage(page)),
  };

  const getPaginatedUsers = useMemo(() => users && currentPage &&
    getPaginatedData(users, currentPage, config.USERS_ON_PAGE), [users, currentPage]);

  // --- Filtred users by Professions
  const getFiltredUsersByProfs = () => usersOriginal && (!currProfessions.length
    ? usersOriginal
    : usersOriginal.filter(({ profession }) =>
      currProfessions.includes(profession._id))
  );

  // --- Apply professions filter
  useEffect(() => {
    dispatch(setUsers(getFiltredUsersByProfs()));
  }, [currProfessions, usersOriginal]);

  // --- Check if all users were deleted from last page
  useEffect(() => {
    getPaginatedUsers?.length < 1 && currentPage >= 2 && dispatch(setCurrentPage(currentPage - 1));
  }, [users]);

  // --- Add user count to professions
  const getProfWithUserCount = (profs, usrs) => {
    const res = JSON.parse(JSON.stringify(profs));
    Object.keys(res).forEach((key) => {
      res[key].sup = usrs.reduce((count, { profession }) =>
        count + +(profession?._id === profs[key]?._id), 0);
    });
    return res;
  };

  // --- add users count to professions
  const addUsersCountToProfs = (prfs, usrs) => (prfs !== null && usrs !== null) &&
    dispatch(setProfessions(getProfWithUserCount(prfs, usrs)));

  // --- If change Original users (delete) to update professions user count
  useEffect(() => { addUsersCountToProfs(professions, usersOriginal); }, [usersOriginal]);

  // --- Parallel Load Users/Professions and add users count to professions
  useEffect(() => {
    let [userLoaded, profLoaded] = [null, null];
    (async function () {
      try {
        [userLoaded, profLoaded] = await Promise.all([
          (async function () {
            return dispatch(setUsers(await api?.users.fetchAll()));
          }()),
          (async function () {
            return dispatch(setProfessions(await api?.professions.fetchAll()));
          }()),
        ]);
      } catch (e) {
        console.error(e.message);
      } finally {
        dispatch(setUsersOriginal(userLoaded.payload));
        addUsersCountToProfs(profLoaded.payload, userLoaded.payload);
      }
    }());
  }, []);

  const togleCurrProf = (profId) => dispatch(setCurrProfessions(
    currProfessions.includes(profId)
      ? currProfessions.filter((id) => id !== profId)
      : [...currProfessions, profId],
  ));

  const clearCurrProf = () => dispatch(setCurrProfessions([]));

  return {
    renderPhrase,
    paginationParams,
    getPaginatedUsers,
    togleCurrProf,
    clearCurrProf,
  };
}
