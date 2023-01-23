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
    data: null,
    status: null,
  },
};

export const LoginAttempt = createAsyncThunk(
  'auth/LoginAttempt',
  async (params) => {
    try {
      const res = await server.post(logURI, params);
      return res.data;
    } catch (e) {
      console.log(`Login failed: ${e}`);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [LoginAttempt.pending]: (state) => {
      state.userLogin.status = 'loading';
      state.userLogin.data = null;
    },
    [LoginAttempt.fulfilled]: (state, action) => {
      state.userLogin.status = 'complete';
      state.userLogin.data = action.payload;
    },
    [LoginAttempt.rejected]: (state) => {
      state.userLogin.status = 'error';
      state.userLogin.data = null;
    },
  },
});

// checking if user = authorized
export function isAuthorized(state) {
  return Boolean(state.auth.userLogin.data);
}

export default authSlice.reducer;
