import { createSlice } from '@reduxjs/toolkit';
import api from '../api';

const users = api?.users.fetchAll();

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    usersOriginal: users || [],
    users: users || [],
    currentPage: 1,
  },
  reducers: {
    setUsers(state, action) { state.users = action.payload; },
    updateUserParamById(state, action) {
      state.users.map((user) => {
        user._id === action.payload._id && (user[action.payload.param] = action.payload.value);
        return user;
      });
    },
    deleteUserById(state, action) {
      state.users = state.users.filter(({ _id }) => _id !== action.payload._id);
    },
    setCurrentPage(state, action) { state.currentPage = action.payload; },
  },
});

export default usersSlice.reducer;
export const { setUsers, updateUserParamById, deleteUserById, setCurrentPage } = usersSlice.actions;
