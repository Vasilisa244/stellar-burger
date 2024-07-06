import {
  IngredientState,
  fetchIngredient,
  ingredientReducer
} from '../ingredientSlice';

const ingredientsState = [
  {
    _id: '1',
    name: 'Булка 1',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '2',
    name: 'Начинка 1',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '3',
    name: 'Начинка 2',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  }
];

describe('Тест работы слайса ингредиентов', () => {
  const initialState: IngredientState = {
    ingredients: [],
    selectIngredient: null
  };

  it('Тест обновления состояния ингредиентов после успешного выполнения fetchIngredient', () => {
    const currentState = ingredientReducer(
      {
        ...initialState
      },
      fetchIngredient.fulfilled(ingredientsState, '')
    );

    expect(currentState).toEqual({
      ...initialState,
      ingredients: ingredientsState
    });
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('Тест обработки ошибки при запросе данных', () => {
    const errorMessage = 'ошибка';
    const currentState = ingredientReducer(
      { ...initialState },
      fetchIngredient.rejected(new Error(errorMessage), '')
    );

    expect(currentState).toEqual({
      ...initialState
    });
    expect(console.log).toHaveBeenCalledWith(errorMessage);
  });

  afterEach(() => {
    (console.log as jest.Mock).mockRestore();
  });
});
