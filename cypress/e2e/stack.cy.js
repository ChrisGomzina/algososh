import { DEFAULT_STATE, 
  CHANGING_STATE,
  SUBMIT_BUTTON,
  RESET_BUTTON,
  BUTTON,
  INPUT } from "./constants";

describe("Корректная работа страницы со стеком", function () {
  beforeEach(function () {
    cy.visit("/stack");
  });
  
  it("кнопки недоступны, если в инпуте пусто", function () {
    cy.get(INPUT).clear();
    cy.get(SUBMIT_BUTTON).should("be.disabled");
    cy.get(`${BUTTON}[class^="text"]`).should("be.disabled");
    cy.get(RESET_BUTTON).should("be.disabled");
  });
  
  it("элемент правильно добавляется в стек", function () {
    for (let i = 1; i < 4; i++) {
      cy.get("input").type(i);
      cy.get(SUBMIT_BUTTON).should("not.be.disabled").click();
  
      cy.get('[class^="stack-page_list"]')
        .find('[class^="circle_content"]')
        .find('[class^="circle_circle"]')
        .as("allCircle");
  
      cy.get("@allCircle").should(async ($allCircle) => {
        expect($allCircle[i - 1]).to.contain(i);
        expect($allCircle[i - 1]).to.have.css("border", CHANGING_STATE);
  
        await new Cypress.Promise((resolve) => setTimeout(resolve, 500));
  
        expect($allCircle[i - 1]).to.have.css("border", DEFAULT_STATE);
      });
    }
  });
  
  it("элемент правильно удаляется из стека", function () {
    for (let i = 1; i < 4; i++) {
      cy.get(INPUT).type(i);
      cy.get(SUBMIT_BUTTON).should("not.be.disabled").click();
    }
  
    cy.get(`${BUTTON}[class^="text"]`).should("not.be.disabled").click();
  
    cy.get('[class^="stack-page_list"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");
  
    cy.get("@allCircle").should(async ($allCircle) => {
      expect($allCircle[2]).to.have.css("border", CHANGING_STATE);
  
      await new Cypress.Promise((resolve) => setTimeout(resolve, 500));
  
      expect($allCircle).to.have.length(2);
      });
  });
  
  it("кнопка 'Очистить' удаляет все элементы из стека", function () {
    for (let i = 1; i < 4; i++) {
      cy.get(INPUT).type(i);
      cy.get(SUBMIT_BUTTON).should("not.be.disabled").click();
    }
  
    cy.get(RESET_BUTTON).should("not.be.disabled").click();
    cy.get('[class^="stack-page_list"]').should("be.empty");
  });
});