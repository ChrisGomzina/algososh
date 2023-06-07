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

  it("строка разворачивается корректно", () => {
    cy.clock();
    cy.get(INPUT).type("12345");
    cy.get(SUBMIT_BUTTON).click();

    cy.get("[data-cy=circle]").eq(0).as("0");
    cy.get("[data-cy=circle]").eq(1).as("1");
    cy.get("[data-cy=circle]").eq(2).as("2");
    cy.get("[data-cy=circle]").eq(3).as("3");
    cy.get("[data-cy=circle]").eq(4).as("4");

    cy.get("@0").should("have.css", "border", DEFAULT_STATE).contains("1");
    cy.get("@1").should("have.css", "border", DEFAULT_STATE).contains("2");
    cy.get("@2").should("have.css", "border", DEFAULT_STATE).contains("3");
    cy.get("@3").should("have.css", "border", DEFAULT_STATE).contains("4");
    cy.get("@4").should("have.css", "border", DEFAULT_STATE).contains("5");

    cy.tick(1000);

    cy.get("@0").should("have.css", "border", CHANGING_STATE).contains("1");
    cy.get("@1").should("have.css", "border", DEFAULT_STATE).contains("2");
    cy.get("@2").should("have.css", "border", DEFAULT_STATE).contains("3");
    cy.get("@3").should("have.css", "border", DEFAULT_STATE).contains("4");
    cy.get("@4").should("have.css", "border", CHANGING_STATE).contains("5");

    cy.tick(1000);

    cy.get("@0").should("have.css", "border", MODIFIED_STATE).contains("5");
    cy.get("@1").should("have.css", "border", CHANGING_STATE).contains("2");
    cy.get("@2").should("have.css", "border", DEFAULT_STATE).contains("3");
    cy.get("@3").should("have.css", "border", CHANGING_STATE).contains("4");
    cy.get("@4").should("have.css", "border", MODIFIED_STATE).contains("1");
    
    cy.tick(1000);

    cy.get("@0").should("have.css", "border", MODIFIED_STATE).contains("5");
    cy.get("@1").should("have.css", "border", MODIFIED_STATE).contains("4");
    cy.get("@2").should("have.css", "border", MODIFIED_STATE).contains("3");
    cy.get("@3").should("have.css", "border", MODIFIED_STATE).contains("2");
    cy.get("@4").should("have.css", "border", MODIFIED_STATE).contains("1");
  });
});
