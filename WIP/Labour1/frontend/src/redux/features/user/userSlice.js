import { createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  islogin: false,
  userParams: [],
};

export const LoginAttempt = createAsyncThunk(loginparams, async () => {
  const res = await axios.get(URI);
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.islogin = action.payload;
    },
    registration: (state, action) => {
      state.userParams = action.payload;
    },
  },
});

export const { login, registration } = userSlice.actions;
export default userSlice.reducer;
