describe("Роутинг работает корректно", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  it("главная страница доступна", function () {
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("страница с алгоритмом развертывания строки доступна", function () {
    cy.get('a[href="/recursion"]').click();
    cy.contains("Строка");
  });

  it("страница с последовательностью Фибоначчи доступна", function () {
    cy.get('a[href="/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("страница с сортировкой массива доступна", function () {
    cy.get('a[href="/sorting"]').click();
    cy.contains("Сортировка массива");
  });

  it("страница со стеком доступна", function () {
    cy.get('a[href="/stack"]').click();
    cy.contains("Стек");
  });

  it("страница с очередью доступна", function () {
    cy.get('a[href="/queue"]').click();
    cy.contains("Очередь");
  });

  it("страница со связными списком доступна", function () {
    cy.get('a[href="/list"]').click();
    cy.contains("Связный список");
  });
});