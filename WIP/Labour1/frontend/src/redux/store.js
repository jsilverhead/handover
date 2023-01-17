import { configureStore } from '@reduxjs/toolkit';
import houseSlice from './features/houses/houseSlice';
import authSlice from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    houses: houseSlice,
  },
});
