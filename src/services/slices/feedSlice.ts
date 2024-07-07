import { TOrder, TOrdersData } from '@utils-types';
import { TFeedsResponse } from '../../utils/burger-api';
import * as burgerApi from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type FeedsState = {
  total: number | null;
  orders: TOrder[];
  totalToday: number | null;
};

export const initialState: FeedsState = {
  total: 0,
  orders: [],
  totalToday: 0
};

export const fetchFeeds = createAsyncThunk<TFeedsResponse, void>(
  'feeds/fetchFeeds',
  async (_, thunkAPI) => {
    const api = thunkAPI.extra as typeof burgerApi;
    return await api.getFeedsApi();
  }
);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    }
  },
  selectors: {
    selectTotal: (state) => state.total,
    selectOrders: (state) => state.orders,
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.total = action.payload.total;
        state.orders = action.payload.orders;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, () => {
        console.log('ошибка');
      });
  }
});

export const { clearOrders } = feedsSlice.actions;
export const { selectTotal, selectOrders, selectTotalToday } =
  feedsSlice.selectors;
export const feedReducer = feedsSlice.reducer;
export default feedsSlice;
