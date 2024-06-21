import { TIngredient, TConstructorIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';

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
    addIngredient: (state, action) => {
      const ingredient = { ...action.payload, id: crypto.randomUUID() };
      if (ingredient.type === 'bun') {
        state.constructorItems.bun = ingredient;
      } else {
        state.constructorItems.ingredients.push(ingredient);
      }
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
