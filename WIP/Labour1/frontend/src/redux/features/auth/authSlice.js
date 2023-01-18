import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import server from '../../../utilites/connection';

const logURI = '/auth/login';
const regURI = '/auth/registration';

const initialState = {
  newUser: {
    userName: '',
    email: '',
    phone: '',
    password: '',
    token: null,
    isLoading: false,
    status: null,
  },
  userLogin: {
    user: null,
    token: null,
    isLoading: false,
    status: null,
  },
};

export const LoginAttempt = createAsyncThunk(
  'auth/LoginAttempt',
  async ({ email, password }) => {
    try {
      const res = await server.get(logURI, { email, password });
      if (res.data.token) {
        window.localStorage.setItem('token', res.data.token);
      }
      return res.data;
    } catch (e) {
      console.log(`Login failed: ${e}`);
    }
  }
);

export const createUser = createAsyncThunk(
  'auth/createUser',
  async ({ userName, email, phone, password }) => {
    try {
      const res = await server.post(regURI, {
        userName,
        email,
        phone,
        password,
      });
      if (res.data.token) {
        window.localStorage.setItem('token', res.data.token);
      }
    } catch (e) {
      console.log(`Registration failed: ${e}`);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.email;
      state.token = action.payload.token;
      console.log('Successfull registartion');
    },
    [createUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
      console.log('Creating user');
    },
    [createUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      console.log(`Login rejected`);
    },
  },
});

export const { login, registration } = authSlice.actions;
export default authSlice.reducer;
