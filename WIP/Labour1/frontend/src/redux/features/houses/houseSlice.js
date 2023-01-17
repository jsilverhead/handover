import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  houses: [],
};

export const getHouses = createAsyncThunk(
  'houses/getHouses',
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get(URI);
    dispatch(loadhouses(res.data));
  }
);

export const houseSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    loadhouses: (state, action) => {
      state.houses = action.payload;
    },
  },
});

export const { loadhouses } = houseSlice.actions;
export default houseSlice.reducer;
