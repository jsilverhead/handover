import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import server from '../../../utilites/connection';

const logURI = '/auth/login';
const checkToken = 'auth/user';
const regURI = '/auth/registration';
const updateURI = '/auth/update';
const passURI = '/auth/gen';
const keyURI = '/auth/checkkey';
const newPassURI = '/auth/newpassword';

const initialState = {
  newUser: {
    userName: '',
    email: '',
    phone: '',
    password: '',
    token: null,
    status: null,
    reply: 0,
    message: null,
  },
  userLogin: {
    data: null,
    status: null,
    reply: 0,
    message: null,
  },
  updatePassword: {
    queryStatus: null,
    reply: 0,
    message: null,
  },
};

export const LoginAttempt = createAsyncThunk(
  'auth/LoginAttempt',
  async (params) => {
    try {
      const res = await server.post(logURI, params);
      return res.data;
    } catch (error) {
      console.log(`Login failed: ${error}`);
    }
  }
);

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  try {
    const res = await server.get(checkToken);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const RegistrationAttempt = createAsyncThunk(
  'auth/RegistrationAttempt',
  async (params) => {
    try {
      const res = await server.post(regURI, params);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const UpdateUser = createAsyncThunk(
  'auth/UpdateUser',
  async (params) => {
    try {
      const res = await server.put(updateURI, params);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const PasswordRequest = createAsyncThunk(
  'auth/PassworRequest',
  async (params) => {
    try {
      const res = await server.post(passURI, params);
      const response = {
        status: res.status,
        data: res.data,
      };
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const KeyCheck = createAsyncThunk('auth/KeyCheck', async (params) => {
  try {
    const res = await server.post(keyURI, params);
    const response = {
      status: res.status,
      data: res.data,
    };
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const fetchNewPassword = createAsyncThunk(
  'auth/fetchNewPassword',
  async (params) => {
    try {
      const res = await server.post(newPassURI, params);
      const response = {
        status: res.status,
        data: res.data,
      };
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.userLogin.data = null;
    },
  },
  extraReducers: {
    [LoginAttempt.pending]: (state) => {
      state.userLogin.status = 'loading';
      state.userLogin.data = null;
    },
    [LoginAttempt.fulfilled]: (state, action) => {
      state.userLogin.status = 'complete';
      state.userLogin.data = action.payload;
    },
    [LoginAttempt.rejected]: (state, action) => {
      state.userLogin.status = 'error';
      state.userLogin.data = null;
      state.userLogin.message = action.payload.message;
    },
    [checkAuth.pending]: (state) => {
      state.userLogin.status = 'loading';
      state.userLogin.data = null;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.userLogin.status = 'complete';
      state.userLogin.data = action.payload;
    },
    [checkAuth.rejected]: (state, action) => {
      state.userLogin.status = 'error';
      state.userLogin.data = null;
      state.userLogin.message = action.payload.message;
    },
    [RegistrationAttempt.pending]: (state) => {
      state.userLogin.status = 'loading';
    },
    [RegistrationAttempt.fulfilled]: (state) => {
      state.userLogin.status = 'complete';
    },
    [RegistrationAttempt.rejected]: (state, action) => {
      state.userLogin.status = 'error';
      state.userLogin.message = action.payload.message;
    },
    [UpdateUser.pending]: (state) => {
      state.userLogin.status = 'loading';
    },
    [UpdateUser.fulfilled]: (state, action) => {
      state.userLogin.status = 'complete';
      state.userLogin.data = action.payload;
    },
    [UpdateUser.rejected]: (state, action) => {
      state.userLogin.status = 'error';
      state.userLogin.message = action.payload.message;
    },
    [PasswordRequest.pending]: (state) => {
      state.updatePassword.queryStatus = 'loading';
    },
    [PasswordRequest.fulfilled]: (state) => {
      state.updatePassword.queryStatus = 'complete';
    },
    [PasswordRequest.rejected]: (state, action) => {
      state.updatePassword.queryStatus = 'error';
      state.updatePassword.message = action.payload.message;
    },
    [KeyCheck.pending]: (state) => {
      state.updatePassword.queryStatus = 'loading';
    },
    [KeyCheck.fulfilled]: (state) => {
      state.updatePassword.queryStatus = 'complete';
    },
    [KeyCheck.rejected]: (state, action) => {
      state.updatePassword.queryStatus = 'error';
      state.updatePassword.message = action.payload.message;
    },
    [fetchNewPassword.pending]: (state) => {
      state.updatePassword.queryStatus = 'loading';
    },
    [fetchNewPassword.fulfilled]: (state) => {
      state.updatePassword.queryStatus = 'complete';
    },
    [fetchNewPassword.rejected]: (state, action) => {
      state.updatePassword.queryStatus = 'error';
      state.updatePassword.message = action.payload.message;
    },
  },
});

// checking if user = authorized
export function isAuthorized(state) {
  return Boolean(state.auth.userLogin.data);
}

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
