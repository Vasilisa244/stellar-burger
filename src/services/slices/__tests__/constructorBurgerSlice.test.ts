import {
  ConstructorBurgerState,
  initialState,
  addIngredient,
  deleteIngredient,
  moveItUpIngredient,
  moveDownIngredient,
  constructorBurgerReducer
} from '../constructorBurgerSlice';

const bun = {
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
};

const ingredient1 = {
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
};
const ingredient2 = {
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
};

describe('Тест работы слайса конструктора ', () => {
  it('Тест обработки экшена добавления булки', () => {
    const currentState = constructorBurgerReducer(
      initialState,
      addIngredient(bun)
    );

    expect(currentState.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  it('Тест обработки экшена добавления начинки', () => {
    const currentState = constructorBurgerReducer(
      initialState,
      addIngredient(ingredient1)
    );

    expect(currentState.constructorItems.ingredients[0]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  it('Тест обработки экшена удаления начинки', () => {
    const initialState: ConstructorBurgerState = {
      constructorItems: {
        bun: null,
        ingredients: [{ ...ingredient1, id: '11' }]
      }
    };

    const currentState = constructorBurgerReducer(
      initialState,
      deleteIngredient(0)
    );

    expect(currentState.constructorItems.ingredients).toEqual([]);
  });

  it('Тест обработки экшена изменения порядка начинки вверх', () => {
    const testInitialState: ConstructorBurgerState = {
      constructorItems: {
        bun: null,
        ingredients: [
          { ...ingredient1, id: '1' },
          { ...ingredient2, id: '2' }
        ]
      }
    };

    const currentState = constructorBurgerReducer(
      testInitialState,
      moveItUpIngredient(1)
    );

    expect(currentState.constructorItems.ingredients).toEqual([
      { ...ingredient2, id: '2' },
      { ...ingredient1, id: '1' }
    ]);
  });

  it('Тест обработки экшена изменения порядка начинки вниз', () => {
    const testInitialState: ConstructorBurgerState = {
      constructorItems: {
        bun: null,
        ingredients: [
          { ...ingredient1, id: '1' },
          { ...ingredient2, id: '2' }
        ]
      }
    };

    const currentState = constructorBurgerReducer(
      testInitialState,
      moveDownIngredient(0)
    );

    expect(currentState.constructorItems.ingredients).toEqual([
      { ...ingredient2, id: '2' },
      { ...ingredient1, id: '1' }
    ]);
  });
});
