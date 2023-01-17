import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../utilites/connection';

const logURI = '/auth/login';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const LoginAttempt = createAsyncThunk(
  'auth/LoginAttempt',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const res = await instance.get(logURI, { email, password });
      if (res.data.token) {
        window.localStorage.setItem('token', res.data.token);
      }
      return res.data;
    } catch (e) {}
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.islogin = action.payload;
    },
    registration: (state, action) => {
      state.userParams = action.payload;
    },
  },
  extraReducers: {
    [LoginAttempt.fulfilled]: (state) => {
      state.isLoading = false;
      console.log('Logged In');
    },
    [LoginAttempt.pending]: (state) => {
      state.isLoading = true;
      console.log('Logging in...');
    },
    [LoginAttempt.rejected]: (state, e) => {
      state.isLoading = false;
      console.log(`Login rejected: ${e}`);
    },
  },
});

export const { login, registration } = authSlice.actions;
export default authSlice.reducer;
