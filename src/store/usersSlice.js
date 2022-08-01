import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    usersOriginal: null,
    users: null,
    professions: null,
    currProfessions: [],
    currentPage: 1,
    currentSort: { col: 'name', type: 'asc' },
    searchStr: '',
  },
  reducers: {
    setUsers(state, action) { state.users = action.payload; },
    setUsersOriginal(state, action) { state.usersOriginal = action.payload; },
    updateUserParamById(state, action) {
      state.users.map((user) => {
        user._id === action.payload._id && (user[action.payload.param] = action.payload.value);
        return user;
      });
      state.usersOriginal.map((user) => {
        user._id === action.payload._id && (user[action.payload.param] = action.payload.value);
        return user;
      });
    },
    deleteUserById(state, action) {
      state.users = state.users.filter(({ _id }) => _id !== action.payload._id);
      state.usersOriginal = state.usersOriginal.filter(({ _id }) => _id !== action.payload._id);
    },
    setCurrentPage(state, action) { state.currentPage = action.payload; },
    setProfessions(state, action) { state.professions = action.payload; },
    setCurrProfessions(state, action) { state.currProfessions = action.payload; },
    setCurrentSort(state, action) { state.currentSort = action.payload; },
    setSearchStr(state, action) { state.searchStr = action.payload; },
  },
});

export default usersSlice.reducer;
export const {
  setUsers,
  updateUserParamById,
  deleteUserById,
  setCurrentPage,
  setProfessions,
  setCurrProfessions,
  setUsersOriginal,
  setCurrentSort,
  setSearchStr,
} = usersSlice.actions;
