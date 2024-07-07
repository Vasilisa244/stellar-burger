const modalContent = '[data-cy=modal-content]';
const closeModalButton = '[data-cy=modal-button-close]';
const bunIngredients = '[data-cy=bun-ingredients]';
const mainIngredients = '[data-cy=main-ingredients]';
const sauceIngredients = '[data-cy=main-ingredients]';
const ingredientsList = '[data-cy=ingredients]';

describe('Блок интеграционных тестов', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1280, 800);
    cy.visit('/');
  });

  describe('проверяем добавление ингредиента в конструктор', () => {
    it('Добавление булки в конструктор', function () {
      cy.get(bunIngredients).contains('Добавить').click();
      cy.get('[data-cy=constructor-bun-top]')
        .contains('Булка 1')
        .should('exist');
      cy.get('[data-cy=constructor-bun-bottom]')
        .contains('Булка 1')
        .should('exist');
    });

    it('Добавление начинки в конструктор', function () {
      cy.get(mainIngredients).contains('Добавить').click();
      cy.get('[data-cy=constructor-ingredients]')
        .contains('Начинка 1')
        .should('exist');
    });
  });

  describe('Работа модального окна', function () {
    it('открытие модального окна ингредиента', function () {
      cy.get(modalContent).should('not.exist');
      cy.get(ingredientsList).contains('Булка 1').click();
      cy.get(modalContent).contains('Булка 1').should('exist');
    });

    it('Тест закрытия модального окна по клику на крестик', function () {
      cy.get(ingredientsList).contains('Булка 1').click();
      cy.get(modalContent).contains('Булка 1').should('exist');
      cy.get(closeModalButton).click();
      cy.get(modalContent).should('not.exist');
    });

    it('Тест закрытия модального окна по клику на оверлей', function () {
      cy.get(ingredientsList).contains('Булка 1').click();
      cy.get(modalContent).contains('Булка 1').should('exist');
      cy.get('[data-cy=modal-overlay-close]').click('top', { force: true });
      cy.get(modalContent).should('not.exist');
    });
  });
});

describe('Создание заказа', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/login', { fixture: 'login.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', JSON.stringify('test-accessToken'));
    cy.viewport(1280, 800);
    cy.visit('/');
  });

  afterEach(function () {
    cy.clearCookie('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('Тест добавления ингредиентов и отправки заказа', function () {
    cy.get(bunIngredients).contains('Добавить').click();
    cy.get(mainIngredients).contains('Добавить').click();
    cy.get(sauceIngredients).contains('Добавить').click();
    cy.get('[data-cy=order-button-post] button').click();

    //Тест соответствия ингредиентов
    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '2', '2', '1']
      });

    //Тест соответствия номера заказа'
    cy.get('[data-cy=order-number]').contains('220044').should('exist');

    //Тест закрытия модального окна  и успешность закрытия
    cy.get(closeModalButton).click();
    cy.get(modalContent).should('not.exist');

    //Тест пустоты конструктора'
    cy.get('[data-cy=constructor]').as('constructor');
    cy.get('@constructor').contains('Булка 1').should('not.exist');
    cy.get('@constructor').contains('Начинка 1').should('not.exist');
    cy.get('@constructor').contains('Соус 1').should('not.exist');
  });
});
