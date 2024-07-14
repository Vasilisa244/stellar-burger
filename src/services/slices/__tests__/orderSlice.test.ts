import {
  initialState,
  fetchOrderNumber,
  fetchNewOrder,
  fetchOrders,
  clearOrederData,
  orderReducer
} from '../orderSlice';

const testOrders = {
  success: true,
  orders: [
    {
      _id: '668934ed856777001bb20294',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный метеоритный бургер',
      createdAt: '2024-07-06T12:13:33.598Z',
      updatedAt: '2024-07-06T12:13:34.121Z',
      number: 45053
    },
    {
      _id: '668931bd856777001bb20290',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2024-07-06T11:59:57.932Z',
      updatedAt: '2024-07-06T11:59:58.367Z',
      number: 45052
    },
    {
      _id: '66892c60856777001bb20280',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-07-06T11:37:04.394Z',
      updatedAt: '2024-07-06T11:37:04.896Z',
      number: 45051
    }
  ]
};

const testUserOrder = {
  success: true,
  name: 'бургер',
  order: {
    _id: '66747575856777001bb1c6a8',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0949',
      '643d69a5c3f7b9001cfa093d'
    ],
    owner: '662f5b4197ede0001d0681b1',
    status: 'done',
    name: 'Экзо-плантаго флюоресцентный метеоритный бургер',
    createdAt: '2024-06-20T18:31:17.665Z',
    updatedAt: '2024-06-20T18:31:18.107Z',
    number: 43577
  }
};

const testIngredients = ['1111', '2222', '3333'];

describe('Тестирование работы слайса заказов пользователя', () => {
  it('Тест загрузки данных о заказе при успешном выполнении fetchOrderNumber', () => {
    const currentState = orderReducer(
      {
        ...initialState
      },
      fetchOrderNumber.fulfilled(testOrders, '', 123456)
    );

    expect(currentState).toEqual({
      ...initialState,
      order: testOrders.orders[0]
    });
  });

  it('Тест загрузки данных о заказах пользователя при успешном выполнении fetchOrders', () => {
    const currentState = orderReducer(
      {
        ...initialState
      },
      fetchOrders.fulfilled(testOrders.orders, '')
    );

    expect(currentState).toEqual({
      ...initialState,
      orders: testOrders.orders
    });
  });

  it('Тест записи данных о заказе при успешном выполнении fetchNewOrder', () => {
    const currentState = orderReducer(
      {
        ...initialState,
        orderRequest: true
      },
      fetchNewOrder.fulfilled(testUserOrder, '', testIngredients)
    );

    expect(currentState).toEqual({
      ...initialState,
      modalOrder: testUserOrder.order,
      orderRequest: false
    });
  });

  it('Тест изменения статуса запроса отправки заказа при pending', () => {
    const currentState = orderReducer(
      initialState,
      fetchNewOrder.pending('', testIngredients)
    );

    expect(currentState).toEqual({
      ...initialState,
      orderRequest: true
    });
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('Тест обработки ошибки при обработке fetchOrders.rejected', () => {
    const errorMessage = 'ошибка';
    const currentState = orderReducer(
      { ...initialState },
      fetchOrderNumber.rejected(new Error(errorMessage), '', 123456)
    );

    expect(currentState).toEqual({
      ...initialState
    });
    expect(console.log).toHaveBeenCalledWith(errorMessage);
  });

  it('Тест обработки ошибки при обработке fetchOrders.rejected', () => {
    const errorMessage = 'ошибка';
    const currentState = orderReducer(
      { ...initialState },
      fetchOrders.rejected(new Error(errorMessage), '')
    );

    expect(currentState).toEqual({
      ...initialState
    });
    expect(console.log).toHaveBeenCalledWith(errorMessage);
  });

  afterEach(() => {
    (console.log as jest.Mock).mockRestore();
  });

  it('Тест очистки данных заказа', () => {
    const currentState = orderReducer(
      { ...initialState, order: testUserOrder.order },
      clearOrederData()
    );

    expect(currentState).toEqual({
      ...initialState,
      order: null
    });
  });
});
