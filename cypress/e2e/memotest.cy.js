/// <reference types="cypress" />

const LINK = "http://127.0.0.1:8080";
context("memotest", () => {
  beforeEach(() => {
    cy.visit(LINK);
  });

  describe("jugar al memotest", () => {
    const NUMERO_CUADROS = 18;

    it("ver tablero", () => {
      cy.get("#tablero")
        .find("div>div.cuadro")
        .should("have.length", NUMERO_CUADROS)
        .find("img");
    });

    it("ver que las imagenes sean aleatorias", () => {
      cy.get(".back");
    });
  });
});
