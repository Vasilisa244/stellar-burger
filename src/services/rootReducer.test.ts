import { rootReducer } from './store';
import { userReducer } from './slices/userSlice';
import { ingredientReducer } from './slices/ingredientSlice';
import { constructorBurgerReducer } from './slices/constructorBurgerSlice';
import { orderReducer } from './slices/orderSlice';
import { feedReducer } from './slices/feedSlice';

describe('rootReducer', () => {
  it('Тест работы rootReducer', () => {
    const testAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, testAction);

    expect(state).toEqual({
      user: userReducer(undefined, testAction),
      ingredient: ingredientReducer(undefined, testAction),
      constructorBurger: constructorBurgerReducer(undefined, testAction),
      order: orderReducer(undefined, testAction),
      feeds: feedReducer(undefined, testAction)
    });
  });
});
