export { getIngredientsApi } from '../../utils/burger-api';
import * as burgerApi from '@api';
import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type IngredientState = {
  ingredients: TIngredient[];
  selectIngredient: TIngredient | null;
};

export const initialState: IngredientState = {
  ingredients: [],
  selectIngredient: null
};

export const fetchIngredient = createAsyncThunk<TIngredient[], void>(
  'ingredient/fetchIngredient',
  async (_, thunkAPI) => {
    const api = thunkAPI.extra as typeof burgerApi;
    return await api.getIngredientsApi();
  }
);

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    setIngredient: (state, action) => {
      const foundIngredient = state.ingredients.find(
        (ingredient) => ingredient._id === action.payload
      );
      state.selectIngredient = foundIngredient || null;
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredient: (state) => state.selectIngredient
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredient.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredient.rejected, () => {
        console.log('ошибка');
      });
  }
});

export const { setIngredient } = ingredientSlice.actions;
export const { selectIngredients, selectIngredient } =
  ingredientSlice.selectors;
export const ingredientReducer = ingredientSlice.reducer;
export default ingredientSlice;
