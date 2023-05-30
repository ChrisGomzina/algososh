describe('Приложение поднялось', () => {
  it('на localhost:3000', () => {
    cy.visit('/');
  });
});