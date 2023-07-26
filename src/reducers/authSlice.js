
import { createSlice } from '@reduxjs/toolkit';
import firebase from '../firebase';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.error = null;
    },
    authError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, authError } = authSlice.actions;
export default authSlice.reducer;


