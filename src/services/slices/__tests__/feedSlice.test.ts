import { fetchFeeds, FeedsState, feedReducer } from '../feedSlice';

const feedsData = {
  success: true,
  total: 44679,
  totalToday: 67,
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

describe('Тест работы слайса ленты заказов', () => {
  const initialState: FeedsState = {
    total: 0,
    orders: [],
    totalToday: 0
  };

  it('Тест обновления состояния заказов, общего количества и количества за сегодня после успешного выполнения fetchFeeds', () => {
    const currentState = feedReducer(
      { ...initialState },
      fetchFeeds.fulfilled(feedsData, '')
    );

    expect(currentState).toEqual({
      ...initialState,
      orders: feedsData.orders,
      total: feedsData.total,
      totalToday: feedsData.totalToday
    });
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('Тест обработки ошибки при запросе данных', () => {
    const errorMessage = 'ошибка';
    const currentState = feedReducer(
      { ...initialState },
      fetchFeeds.rejected(new Error(errorMessage), '')
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
