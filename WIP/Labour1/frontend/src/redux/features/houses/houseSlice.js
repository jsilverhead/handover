import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import server from '../../../utilites/connection';

const URI = '/';
const filterURI = '/filter';

const initialState = {
  houses: {
    items: [],
    static: [],
    status: null,
    maxprice: 0,
    maxspace: 0,
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
  filters: {
    subtype: '',
    query: 0,
  },
};

export const getHouses = createAsyncThunk('houses/getHouses', async () => {
  const res = await server.get(URI);
  return res.data;
});

export const houseSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    filterHouses: (state, action) => {
      state.houses.items = [...state.houses.static];
      const query = action.payload;
      console.log(query);
      state.houses.items = state.houses.items.filter((item) => {
        if (query.searchQuery) {
          return (
            (item.title
              .toLowerCase()
              .includes(query.searchQuery.toLowerCase()) &&
              item.price <= query.priceMax &&
              item.price >= query.priceMin &&
              item.space <= query.spaceMax &&
              item.space >= query.spaceMin &&
              item.flat === query.flat) ||
            item.hotel === query.hotel ||
            item.estate === query.estate
          );
        } else {
          return (
            (item.price <= query.priceMax &&
              item.price >= query.priceMin &&
              item.space <= query.spaceMax &&
              item.space >= query.spaceMin &&
              item.flat === query.flat) ||
            item.hotel === query.hotel ||
            item.estate === query.estate
          );
        }
      });
    },
  },
  extraReducers: {
    [getHouses.pending]: (state) => {
      state.houses.items = [];
      state.houses.status = 'loading';
    },
    [getHouses.fulfilled]: (state, action) => {
      state.houses.items = action.payload;
      state.houses.static = action.payload;
      // get Maximum houses price
      const priceMax = action.payload.reduce((acc, curr) =>
        acc.price > curr.price ? acc : curr
      );
      state.houses.maxprice = priceMax.price;

      // get Maximum houses space
      const spaceMax = action.payload.reduce((acc, curr) =>
        acc.space > curr.space ? acc : curr
      );
      state.houses.maxspace = spaceMax.space;

      state.houses.status = 'complete';
    },
    [getHouses.rejected]: (state) => {
      state.houses.items = [];
      state.houses.status = 'error';
    },
  },
});

export const { filterHouses } = houseSlice.actions;
export default houseSlice.reducer;
