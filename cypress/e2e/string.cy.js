import { DEFAULT_STATE, 
  CHANGING_STATE,
  MODIFIED_STATE,
  INPUT,
  SUBMIT_BUTTON } from "./constants";

describe("Корректная работа страницы с разворотом строки", function () {
  beforeEach(function () {
    cy.visit("/recursion");
  });
  
  it("кнопка недоступна, если в инпуте пусто", function () {
    cy.get(INPUT).clear();
    cy.get(SUBMIT_BUTTON).should("be.disabled");
  });
  
  it("строка разворачивается корректно", function () {
    cy.get(INPUT).type("12345");
    cy.get(SUBMIT_BUTTON).should("not.be.disabled").click();
  
    cy.get('[class^="string_list"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");
  
    cy.get("@allCircle").should(async ($allCircle) => {
      expect($allCircle).to.have.length(5);
      const array = ["1", "2", "3", "4", "5"];
      let start = 0;
      let end = 4;
  
      while (start <= end) {
        expect($allCircle[start]).to.contain(array[start]);
        expect($allCircle[start]).to.have.css("border", DEFAULT_STATE);

        start++;
      }
  
      await new Cypress.Promise((resolve) => setTimeout(resolve, 1000));
  
      start = 0;
      end = 4;
  
      while (start <= end) {
        expect($allCircle[start]).to.have.css("border", CHANGING_STATE);
        expect($allCircle[end]).to.have.css("border", CHANGING_STATE);
  
        await new Cypress.Promise((resolve) => setTimeout(resolve, 1000));
  
        expect($allCircle[start]).to.contain(array[end]);
        expect($allCircle[end]).to.contain(array[start]);
        expect($allCircle[start]).to.have.css("border", MODIFIED_STATE);
        expect($allCircle[end]).to.have.css("border", MODIFIED_STATE);

        start++;
        end--;
      }
    });
  });
});