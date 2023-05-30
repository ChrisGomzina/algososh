import { SUBMIT_BUTTON, INPUT } from "./constants";

describe("Корректная работа страницы с последовательностью Фиббоначи", function () {
  beforeEach(function () {
    cy.visit("/fibonacci");
  });
  
  it("кнопка недоступна, если в инпуте пусто", function () {
    cy.get(INPUT).clear();
    cy.get(SUBMIT_BUTTON).should("be.disabled");
  });
  
  it("последовательноть генерируется корректно", function () {
    cy.get(INPUT).type("5");
    cy.get(SUBMIT_BUTTON).should("not.be.disabled").click();
  
    cy.get('[class^="fibonacci-page_list"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");
  
      const fibonacci_numbers = [0, 1, 1, 2, 3, 5, 8, 13, 21];
      const num = 9;
  
    cy.get("@allCircle").should(($allCircle) => {
      for (let i = 0; i <= num ; i++) {
        expect($allCircle[i]).to.contain(fibonacci_numbers[i]);
      }
    });
  });
});