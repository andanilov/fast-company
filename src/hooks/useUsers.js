import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { getNumStrEnd } from '../utils/getNumStrEnd';
import {
  setUsers,
  setCurrentPage,
  setProfessions,
  setCurrProfessions,
  setUsersOriginal,
  setSearchStr,
} from '../store/usersSlice';
import config from '../conf';
import api from '../api';
import { getPaginatedData } from '../utils/getPaginatedData';
import pipe from '../utils/pipe';

export default function useUsers() {
  const dispatch = useDispatch();
  const usersOriginal = useSelector((state) => state.users.usersOriginal);
  const users = useSelector((state) => state.users.users);
  const currentPage = useSelector((state) => state.users.currentPage);
  const professions = useSelector((state) => state.users.professions);
  const currProfessions = useSelector((state) => state.users.currProfessions);
  const currentSort = useSelector((state) => state.users.currentSort);
  const searchStr = useSelector((state) => state.users.searchStr);

  // ---
  // --- METHODS
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
  const getFiltredUsersByProfs = (usrs = usersOriginal) => usrs && (!currProfessions.length
    ? usrs
    : usrs.filter(({ profession }) =>
      currProfessions.includes(profession._id))
  );

  // --- Sorted users by col and type
  const getSortedUsers = (usrs = usersOriginal) => ((usrs && currentSort?.col && currentSort?.type)
    ? _.orderBy(usrs, [currentSort.col], [currentSort.type])
    : usrs);

  // --- Searching for users by str name
  const getSearchedUsers = (usrs = usersOriginal) => (searchStr
    ? usrs.filter(({ name }) => name.includes(searchStr))
    : usrs);

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

  const togleCurrProf = (profId) => dispatch(setCurrProfessions(
    currProfessions.includes(profId)
      ? currProfessions.filter((id) => id !== profId)
      : [...currProfessions, profId],
  ));

  const clearCurrProf = () => dispatch(setCurrProfessions([]));
  const changeSearchStr = (str) => dispatch(setSearchStr(str));
  const getUserById = async (id) => await api.users.fetchUserById(id);
  const getAllProfessions = async () => await api.professions.fetchAll();
  const getAllSex = () => [
    { _id: 'male', name: 'Мужской' },
    { _id: 'female', name: 'Женский' },
    { _id: '', name: 'Европейский' },
  ];
  const getAllQualities = async () => await api.qualities.fetchAll();
  const updateUser = async (id, data) => await api.users.update(id, data);

  const userLoading = () => {
    setUsers();
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
  };

  // ---
  // --- HOOKS
  // --- Apply filters, searching, sorting
  useEffect(() => {
    pipe(
      getFiltredUsersByProfs, // 1. Filter users by professions
      getSearchedUsers, // 2. Search users
      getSortedUsers, // 3. Sort users
      setUsers, // 4. Make action
      dispatch, // 5. Add action to Redux
    )(usersOriginal); // Initial pipe (first data)
  }, [
    currProfessions,
    usersOriginal,
    currentSort,
    searchStr,
  ]);

  // --- Check if all users were deleted from last page
  useEffect(() => {
    getPaginatedUsers?.length < 1 && currentPage >= 2 && dispatch(setCurrentPage(currentPage - 1));
  }, [users]);

  // --- If change Original users (delete) to update professions user count
  useEffect(() => { addUsersCountToProfs(professions, usersOriginal); }, [usersOriginal]);

  // --- Parallel Load Users/Professions and add users count to professions
  useEffect(() => {
    // -- Pass if loading started!
    !usersOriginal && !professions && userLoading();
  }, []);

  return {
    userLoading,
    renderPhrase,
    paginationParams,
    getPaginatedUsers,
    togleCurrProf,
    clearCurrProf,
    changeSearchStr,
    getUserById,
    getAllProfessions,
    getAllSex,
    getAllQualities,
    updateUser,
  };
}
