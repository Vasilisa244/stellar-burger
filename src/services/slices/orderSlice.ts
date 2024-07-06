import { TOrder, TOrdersData } from '@utils-types';
import { TOrderResponse, TNewOrderResponse } from '../../utils/burger-api';
import * as burgerApi from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type OrderState = {
  order: TOrder | null;
  orders: TOrder[];
  modalOrder: TOrder | null;
  orderRequest: boolean;
};

const initialState: OrderState = {
  order: null,
  orders: [],
  modalOrder: null,
  orderRequest: false
};

export const fetchOrderNumber = createAsyncThunk<TOrderResponse, number>(
  'order/fetchOrderNumber',
  async (orderNumber, thunkAPI) => {
    const api = thunkAPI.extra as typeof burgerApi;
    return await api.getOrderByNumberApi(orderNumber);
  }
);

export const fetchNewOrder = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/fetchNewOrder',
  async (order, thunkAPI) => {
    const api = thunkAPI.extra as typeof burgerApi;
    return await api.orderBurgerApi(order);
  }
);

export const fetchOrders = createAsyncThunk<TOrder[], void>(
  'order/fetchOrders',
  async (_, thunkAPI) => {
    const api = thunkAPI.extra as typeof burgerApi;
    return await api.getOrdersApi();
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrederData: (state) => {
      state.order = null;
    },
    clearModalOrder: (state) => {
      state.modalOrder = null;
    }
  },
  selectors: {
    selectOrder: (state) => state.order,
    selectOrders: (state) => state.orders,
    selectModalOrder: (state) => state.modalOrder,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
      })
      .addCase(fetchOrderNumber.rejected, () => {
        console.log('ошибка');
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.modalOrder = action.payload.order;
      })
      .addCase(fetchNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchNewOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, () => {
        console.log('ошибка');
      });
  }
});

export const { clearOrederData, clearModalOrder } = orderSlice.actions;
export const {
  selectOrder,
  selectOrders,
  selectModalOrder,
  selectOrderRequest
} = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
export default orderSlice;
