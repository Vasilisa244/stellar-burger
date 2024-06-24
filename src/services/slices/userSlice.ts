import {
  PayloadAction,
  configureStore,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  TRegisterData,
  TAuthResponse,
  TLoginData,
  TUserResponse,
  TServerResponse
} from '../../utils/burger-api';
import * as burgerApi from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: UserState = {
  user: null,
  isAuthChecked: false
};

export const checkUserAuth = createAsyncThunk<TUserResponse, void>(
  'user/checkUserAuth',
  async (_, thunkAPI) => {
    const api = thunkAPI.extra as typeof burgerApi;
    return await api.getUserApi();
  }
);

export const fetchLogin = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/fetchLoginUser',
  async (user, thunkAPI) => {
    const api = thunkAPI.extra as typeof burgerApi;
    const res = await api.loginUserApi(user);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const fetchRegisterUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/fetchRegisterUser',
  async (user, thunkAPI) => {
    const api = thunkAPI.extra as typeof burgerApi;
    const res = await api.registerUserApi(user);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const fetchUpdateUser = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>('user/fetchUpdateUser', async (user, thunkAPI) => {
  const api = thunkAPI.extra as typeof burgerApi;
  const res = await api.updateUserApi(user);
  return res;
});

export const fetchLogout = createAsyncThunk<TServerResponse<{}>, void>(
  'user/fetchLogout',
  async (_, thunkAPI) => {
    const api = thunkAPI.extra as typeof burgerApi;
    const res = await api.logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    return res;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    selectUserData: (state) => state.user,
    selectIsUserChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.user = null;
      });
  }
});

export const { authChecked } = userSlice.actions;
export const { selectUserData, selectIsUserChecked } = userSlice.selectors;
export default userSlice;
