import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import server from '../../../utilites/connection';

const URI = '/';

const initialState = {
  houses: {
    items: [],
    status: null,
  },
  houseInfo: {
    title: '',
    price: 0,
    space: 0,
    address: '',
    desc: '',
    houseType: '',
    picture: '',
    googleurl: '',
    status: null,
  },
};

export const getHouses = createAsyncThunk('houses/getHouses', async () => {
  const res = await server.get(URI);
  return res.data;
});

export const houseSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {},
  extraReducers: {
    [getHouses.pending]: (state) => {
      state.houses.items = [];
      state.houses.status = 'loading';
    },
    [getHouses.fulfilled]: (state, action) => {
      state.houses.items = action.payload;
      state.houses.status = 'complete';
    },
    [getHouses.rejected]: (state) => {
      state.houses.items = [];
      state.houses.status = 'error';
    },
  },
});

export default houseSlice.reducer;
