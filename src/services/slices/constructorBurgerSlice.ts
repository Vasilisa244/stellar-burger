import { TIngredient, TConstructorIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ConstructorBurgerState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: ConstructorBurgerState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const constructorBurgerSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload;
        } else {
          state.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: crypto.randomUUID() }
      })
    },
    deleteIngredient: (state, action) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    moveItUpIngredient: (state, action) => {
      const index = action.payload;
      const { ingredients } = state.constructorItems;
      const itemToMove = ingredients[index];
      ingredients.splice(index, 1);
      ingredients.splice(index - 1, 0, itemToMove);
    },
    moveDownIngredient: (state, action) => {
      const index = action.payload;
      const { ingredients } = state.constructorItems;
      const itemToMove = ingredients[index];
      ingredients.splice(index, 1);
      ingredients.splice(index + 1, 0, itemToMove);
    },
    clearBasket: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  },

  selectors: {
    selectConstructorBurger: (state) => state.constructorItems
  }
});

export const {
  addIngredient,
  deleteIngredient,
  moveItUpIngredient,
  moveDownIngredient,
  clearBasket
} = constructorBurgerSlice.actions;
export const { selectConstructorBurger } = constructorBurgerSlice.selectors;
export default constructorBurgerSlice;
