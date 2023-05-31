import { DEFAULT_STATE,
  CHANGING_STATE,
  MODIFIED_STATE,
  SUBMIT_BUTTON,
  ADD_TO_TAIL_BUTTON,
  ADD_BY_INDEX_BUTTON,
  DELETE_BY_INDEX_BUTTON,
  DELETE_HEAD_BUTTON,
  DELETE_TAIL_BUTTON,
  INPUT } from "./constants";

describe("Корректная работа страницы со связным списком", function () {
  beforeEach(function () {
    cy.visit("/list");
  });

  it("кнопки недоступны, если в инпуте пусто", function () {
    cy.get(INPUT).clear();
    cy.get(SUBMIT_BUTTON).should("be.disabled");
    cy.get(ADD_TO_TAIL_BUTTON).should("be.disabled");
    cy.get(ADD_BY_INDEX_BUTTON).should("be.disabled");
    cy.get(DELETE_BY_INDEX_BUTTON).should("be.disabled");
  });

  it("отрисовка дефолтного списка", function () {
    const arr = [0, 34, 8, 1];

    cy.get('[class^="list-page_list"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle").each(($el, index) => {
      expect($el).to.contain(arr[index]);
      expect($el).to.have.css("border", DEFAULT_STATE);
    });

    cy.get('[class^="list-page_list"]')
      .find('[class^="circle_content"]')
      .first()
      .should("contain", "head");

    cy.get('[class^="list-page_list"]')
      .find('[class^="circle_content"]')
      .last()
      .should("contain", "tail");
    });

  it("добавление элемента в head", function () {
    cy.get("input[type='text']").type(5);
    cy.get(SUBMIT_BUTTON).should("not.be.disabled").click();

    cy.get('[class^="list-page_list"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle")
      .first()
      .should("contain", "5")
      .should("have.css", "border", CHANGING_STATE)
      .should("have.css", "width", "56px");

    cy.wait(1000);

    cy.get("@allCircle")
      .first()
      .should("contain", "5")
      .should("have.css", "border", MODIFIED_STATE);

    cy.wait(500);

    cy.get("@allCircle")
      .first()
      .should("have.css", "border", DEFAULT_STATE);

    cy.get('[class^="list-page_list"]')
      .find('[class^="circle_content"]')
      .first()
      .should("contain", "head");
  });

  it("добавление элемента в tail", function () {
    cy.get("input[type='text']").type(5);
    cy.get(ADD_TO_TAIL_BUTTON).should("not.be.disabled").click();

    cy.get('[class^="list-page_list"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle")
      .eq(3)
      .should("contain", "5")
      .should("have.css", "border", CHANGING_STATE)
      .should("have.css", "width", "56px");

    cy.wait(1000);

    cy.get("@allCircle")
      .last()
      .should("contain", "5")
      .should("have.css", "border", MODIFIED_STATE);

    cy.wait(500);

    cy.get("@allCircle")
      .last()
      .should("have.css", "border", DEFAULT_STATE);

    cy.get('[class^="list-page_list"]')
      .find('[class^="circle_content"]')
      .last()
      .should("contain", "tail");
  });

  it("добавление элемента по индексу", function () {
    cy.get("input[type='text']").type(5);
    cy.get("input[type='number']").type(2);
    cy.get(ADD_BY_INDEX_BUTTON).should("not.be.disabled").click();

    cy.get('[class^="list-page_list"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    for (let i = 0; i < 3; i++) {
      cy.wait(1000);

      cy.get("@allCircle")
        .eq(i)
        .should("contain", "5")
        .should("have.css", "border", CHANGING_STATE)
        .should("have.css", "width", "56px");

      cy.get("@allCircle")
        .eq(i + 1)
        .should("have.css", "border", CHANGING_STATE);
    }

    cy.wait(1000);

    cy.get("@allCircle")
      .eq(2)
      .should("contain", "5")
      .should("have.css", "border", MODIFIED_STATE)
      .should("have.css", "width", "80px");

    cy.wait(500);

    cy.get("@allCircle")
      .eq(2)
      .should("have.css", "border", DEFAULT_STATE);
  });

  it("удаление эелемета из head", function () {
    cy.get(DELETE_HEAD_BUTTON).should("not.be.disabled").click();

    cy.get('[class^="list-page_list"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle")
      .eq(1)
      .should("contain", "0")
      .should("have.css", "border", CHANGING_STATE)
      .should("have.css", "width", "56px");

    cy.wait(1000);

    cy.get("@allCircle")
      .first()
      .should("contain", "34")
      .should("have.css", "border", DEFAULT_STATE)
      .should("have.css", "width", "80px");

    cy.get('[class^="list-page_list"]')
      .find('[class^="circle_content"]')
      .first()
      .should("contain", "head");
  });

  it("удаление эелемета из tail", function () {
    cy.get(DELETE_TAIL_BUTTON).should("not.be.disabled").click();

    cy.get('[class^="list-page_list"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle")
      .last()
      .should("contain", "1")
      .should("have.css", "border", CHANGING_STATE)
      .should("have.css", "width", "56px");

    cy.wait(1000);

    cy.get("@allCircle")
      .last()
      .should("contain", "8")
      .should("have.css", "border", DEFAULT_STATE)
      .should("have.css", "width", "80px");

    cy.get('[class^="list-page_list"]')
      .find('[class^="circle_content"]')
      .last()
      .should("contain", "tail");
  });

  it("удаление эелемета по индексу", function () {
    cy.get("input[type='number']").type(2);
    cy.get(DELETE_BY_INDEX_BUTTON).should("not.be.disabled").click();

    cy.get('[class^="list-page_list"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    for (let i = 0; i < 3; i++) {
      cy.wait(1000);

      cy.get("@allCircle")
        .eq(i)
        .should("have.css", "border", CHANGING_STATE)
        .should("have.css", "width", "80px");
    }

    cy.wait(1000);

    cy.get("@allCircle")
      .eq(3)
      .should("contain", "8")
      .should("have.css", "border", CHANGING_STATE)
      .should("have.css", "width", "56px");

    cy.wait(1000);

    cy.get("@allCircle")
      .eq(2)
      .should("contain", "1")
      .should("have.css", "border", DEFAULT_STATE);
  });
});