import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import server from '../../../utilites/connection';

const logURI = '/auth/login';
const checkToken = 'auth/user';
const regURI = '/auth/registration';
const updateURI = '/auth/update';
const passURI = '/auth/gen';
const keyURI = '/auth/checkkey';
const newPassURI = '/auth/newpassword';
const userDataURI = '/auth/getuserdata';

const initialState = {
  newUser: {
    status: null,
    error: null,
  },
  userLogin: {
    data: null,
    status: null,
    error: null,
  },
  updatePassword: {
    status: null,
    error: null,
  },
  userInfo: {
    status: null,
    data: null,
  },
};

export const LoginAttempt = createAsyncThunk(
  'auth/LoginAttempt',
  async (params, { rejectWithValue }) => {
    try {
      const res = await server.post(logURI, params);
      const response = {
        status: res.status,
        data: res.data,
      };
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const res = await server.get(checkToken);
  const response = {
    status: res.status,
    data: res.data,
  };
  return response;
});

export const RegistrationAttempt = createAsyncThunk(
  'auth/RegistrationAttempt',
  async (params, { rejectWithValue }) => {
    try {
      const res = await server.post(regURI, params);
      const response = {
        status: res.status,
        data: res.data,
      };
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateUser = createAsyncThunk(
  'auth/UpdateUser',
  async (params, { rejectWithValue }) => {
    try {
      const res = await server.put(updateURI, params);
      const response = {
        status: res.status,
        data: res.data,
      };
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const PasswordRequest = createAsyncThunk(
  'auth/PassworRequest',
  async (params, { rejectWithValue }) => {
    try {
      const res = await server.post(passURI, params);
      const response = {
        status: res.status,
        data: res.data,
      };
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const KeyCheck = createAsyncThunk(
  'auth/KeyCheck',
  async (params, { rejectWithValue }) => {
    try {
      const res = await server.post(keyURI, params);
      const response = {
        status: res.status,
        data: res.data,
      };
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchNewPassword = createAsyncThunk(
  'auth/fetchNewPassword',
  async (params, { rejectWithValue }) => {
    try {
      const res = await server.post(newPassURI, params);
      const response = {
        status: res.status,
        data: res.data,
      };
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (params) => {
    try {
      const res = await server.get(userDataURI, params);
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
      state.userLogin.error = action.payload;
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
      state.userLogin.reply = action.payload;
    },
    [RegistrationAttempt.pending]: (state) => {
      state.newUser.status = 'loading';
    },
    [RegistrationAttempt.fulfilled]: (state) => {
      state.newUser.status = 'complete';
    },
    [RegistrationAttempt.rejected]: (state, action) => {
      state.newUser.status = 'error';
      state.newUser.error = action.payload;
    },
    [UpdateUser.pending]: (state) => {
      state.userLogin.status = 'loading';
    },
    [UpdateUser.fulfilled]: (state, action) => {
      state.userLogin.data = null;
      state.userLogin.status = 'complete';
      state.userLogin.data = action.payload;
    },
    [UpdateUser.rejected]: (state, action) => {
      state.userLogin.status = 'error';
      state.userLogin.error = action.payload;
    },
    [PasswordRequest.pending]: (state) => {
      state.updatePassword.status = 'loading';
    },
    [PasswordRequest.fulfilled]: (state) => {
      state.updatePassword.status = 'complete';
    },
    [PasswordRequest.rejected]: (state, action) => {
      state.updatePassword.status = 'error';
      state.updatePassword.error = action.payload;
    },
    [KeyCheck.pending]: (state) => {
      state.updatePassword.status = 'loading';
    },
    [KeyCheck.fulfilled]: (state) => {
      state.updatePassword.status = 'complete';
    },
    [KeyCheck.rejected]: (state, action) => {
      state.updatePassword.status = 'error';
      state.updatePassword.reply = action.payload;
    },
    [fetchNewPassword.pending]: (state) => {
      state.updatePassword.status = 'loading';
    },
    [fetchNewPassword.fulfilled]: (state) => {
      state.updatePassword.status = 'complete';
    },
    [fetchNewPassword.rejected]: (state, action) => {
      state.updatePassword.status = 'error';
      state.updatePassword.reply = action.payload;
    },
    [getUserInfo.pending]: (state) => {
      state.userInfo.status = ' loading';
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.userInfo.status = 'complete';
      state.userInfo.data = action.payload;
    },
    [getUserInfo.rejected]: (state) => {
      state.userInfo.status = 'error';
    },
  },
});

// checking if user = authorized
export function isAuthorized(state) {
  return Boolean(state.auth.userLogin.data);
}

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
