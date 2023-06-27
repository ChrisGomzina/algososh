import { DEFAULT_STATE,
  CHANGING_STATE,
  SUBMIT_BUTTON,
  RESET_BUTTON,
  BUTTON,
  INPUT } from "./constants";

describe("Корректная работа страницы с очередью", function () {
  beforeEach(function () {
    cy.visit("/queue");
  });
  
  it("кнопки недоступны, если в инпуте пусто", function () {
    cy.get(INPUT).clear();
    cy.get(SUBMIT_BUTTON).should("be.disabled");
    cy.get(`${BUTTON}[class^="text"]`).should("be.disabled");
    cy.get(RESET_BUTTON).should("be.disabled");
  });
  
  it("элемент правильно добавляется в очередь", function () {
    for (let i = 1; i < 4; i++) {
      cy.get(INPUT).type(i);
      cy.get(SUBMIT_BUTTON).should("not.be.disabled").click();
  
      cy.get('[class^="queue-page_list"]')
        .find('[class^="circle_content"]')
        .find('[class^="circle_circle"]')
        .as("allCircle");
  
      cy.get("@allCircle").should(async ($allCircle) => {
        expect($allCircle[i - 1]).to.have.css("border", CHANGING_STATE);
  
        await new Cypress.Promise((resolve) => setTimeout(resolve, 500));
  
        expect($allCircle[i - 1]).to.contain(i);
        expect($allCircle[i - 1]).to.have.css("border", DEFAULT_STATE);
      });
  
      cy.get('[class^="queue-page_list"]')
        .find('[class^="circle_content"]')
        .eq(0)
        .should("contain", "head");

      cy.get('[class^="queue-page_list"]')
        .find('[class^="circle_content"]')
        .eq(i - 1)
        .should("contain", "tail");
    }
  });
  
  it("элемент правильно удаляется из очереди", function () {
    for (let i = 1; i < 4; i++) {
      cy.get(INPUT).type(i);
      cy.get(SUBMIT_BUTTON).should("not.be.disabled").click();
      cy.wait(500);
    }
  
    cy.get(`${BUTTON}[class^="text"]`).should("not.be.disabled").click();
  
    cy.get('[class^="queue-page_list"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");
  
    cy.get("@allCircle").should(async ($allCircle) => {
      expect($allCircle[0]).to.have.css("border", CHANGING_STATE);

      await new Cypress.Promise((resolve) => setTimeout(resolve, 500));
  
      expect($allCircle[0]).to.contain("");
    });
  
    cy.get('[class^="queue-page_list"]')
      .find('[class^="circle_content"]')
      .eq(1)
      .should("contain", "head");
  });
  
  it("кнопка 'Очистить' удаляет все элементы из очереди", function () {
    for (let i = 1; i < 4; i++) {
      cy.get(INPUT).type(i);
      cy.get(SUBMIT_BUTTON).should("not.be.disabled").click();
      cy.wait(500);
    }
  
    cy.get(RESET_BUTTON).should("not.be.disabled").click();
  
    cy.get('[class^="queue-page_list"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");
  
    cy.get("@allCircle").should("contain", "");
  });
});