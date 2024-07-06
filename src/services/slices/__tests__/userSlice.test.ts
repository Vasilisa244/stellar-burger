import {
  UserState,
  checkUserAuth,
  fetchLogin,
  fetchRegisterUser,
  fetchUpdateUser,
  fetchLogout,
  userReducer
} from '../userSlice';

const testUser = {
  success: true,
  user: {
    name: 'testUser',
    email: 'test@email.com'
  }
};

const testLoginUser = {
  success: true,
  accessToken: 'Bearer fake',
  refreshToken: 'fake',
  user: { email: 'test@email.com', name: 'testUser' }
};

describe('Тестирование работы слайса пользователя', () => {
  const initialState: UserState = {
    user: null,
    isAuthChecked: false
  };

  it('Тест загрузки данных о заказе при успешном выполнении checkUserAuth', () => {
    const currentState = userReducer(
      {
        ...initialState
      },
      checkUserAuth.fulfilled(testUser, '')
    );

    expect(currentState).toEqual({
      ...initialState,
      user: testUser.user,
      isAuthChecked: true
    });
  });

  it('Тест сохранения данных пользователя при успешном выполнении fetchLogin', () => {
    const currentState = userReducer(
      {
        ...initialState
      },
      fetchLogin.fulfilled(testLoginUser, '', {
        email: 'test@email.com',
        password: 'testPass'
      })
    );

    expect(currentState).toEqual({
      ...initialState,
      user: testLoginUser.user
    });
  });

  it('Тест сохранения данных при успешном выполнении fetchRegisterUser', () => {
    const currentState = userReducer(
      {
        ...initialState
      },
      fetchRegisterUser.fulfilled(testLoginUser, '', {
        email: 'test@email.com',
        password: 'testPass',
        name: 'testUser'
      })
    );

    expect(currentState).toEqual({
      ...initialState,
      user: testLoginUser.user
    });
  });

  it('Тест сохранения данных пользователя при успешном выполнении fetchUpdateUser', () => {
    const currentState = userReducer(
      {
        ...initialState
      },
      fetchUpdateUser.fulfilled(testUser, '', {
        email: 'test@email.com',
        password: 'testPass',
        name: 'testUser'
      })
    );

    expect(currentState).toEqual({
      ...initialState,
      user: testUser.user
    });
  });

  it('Тест очистки данных пользователя при успешном выполнении fetchLogout', () => {
    const currentState = userReducer(
      {
        ...initialState
      },
      fetchLogout.fulfilled(testLoginUser, '')
    );

    expect(currentState).toEqual({
      ...initialState,
      user: null
    });
  });
});
