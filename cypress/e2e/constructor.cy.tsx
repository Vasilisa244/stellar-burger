describe('Блок интеграционных тестов', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1280, 800);
    cy.visit('http://localhost:4000');
  });

  describe('проверяем добавление ингредиента в конструктор', () => {
    it('Добавление булки в конструктор', function () {
      cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=constructor-bun-top]')
        .contains('Булка 1')
        .should('exist');
      cy.get('[data-cy=constructor-bun-bottom]')
        .contains('Булка 1')
        .should('exist');
    });

    it('Добавление начинки в конструктор', function () {
      cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=constructor-ingredients]')
        .contains('Начинка 1')
        .should('exist');
    });
  });

  describe('Работа модального окна', function () {
    it('открытие модального окна ингредиента', function () {
      cy.get('[data-cy=modal-content]').should('not.exist');
      cy.get('[data-cy=ingredients]').contains('Булка 1').click();
      cy.get('[data-cy=modal-content]').contains('Булка 1').should('exist');
    });

    it('Тест закрытия модального окна по клику на крестик', function () {
      cy.get('[data-cy=ingredients]').contains('Булка 1').click();
      cy.get('[data-cy=modal-content]').contains('Булка 1').should('exist');
      cy.get('[data-cy=modal-button-close]').click();
      cy.get('[data-cy=modal-content]').should('not.exist');
    });

    it('Тест закрытия модального окна по клику на оверлей', function () {
      cy.get('[data-cy=ingredients]').contains('Булка 1').click();
      cy.get('[data-cy=modal-content]').contains('Булка 1').should('exist');
      cy.get('[data-cy=modal-overlay-close]').click('top', { force: true });
      cy.get('[data-cy=modal-content]').should('not.exist');
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
    cy.visit('http://localhost:4000');
  });

  afterEach(function () {
    cy.clearCookie('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('Тест добавления ингредиентов и отправки заказа', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=order-button-post] button').click();

    //Тест соответствия ингредиентов
    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '2', '4', '1']
      });

    //Тест соответствия номера заказа'
    cy.get('[data-cy=order-number]').contains('220044').should('exist');

    //Тест закрытия модального окна  и успешность закрытия
    cy.get('[data-cy=modal-button-close]').click();
    cy.get('[data-cy=modal-content]').should('not.exist');

    //Тест пустоты конструктора'
    cy.get('[data-cy=constructor]').contains('Булка 1').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Начинка 1').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Соус 1').should('not.exist');
  });
});
