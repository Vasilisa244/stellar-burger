import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';
import { ingredientSlice } from './slices/ingredientSlice';
import { constructorBurgerSlice } from './slices/constructorBurgerSlice';
import { orderSlice } from './slices/orderSlice';
import { feedsSlice } from './slices/feedSlice';
import * as burgerApi from '@api';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  [userSlice.reducerPath]: userSlice.reducer,
  [ingredientSlice.reducerPath]: ingredientSlice.reducer,
  [constructorBurgerSlice.reducerPath]: constructorBurgerSlice.reducer,
  [orderSlice.reducerPath]: orderSlice.reducer,
  [feedsSlice.reducerPath]: feedsSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: burgerApi
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
