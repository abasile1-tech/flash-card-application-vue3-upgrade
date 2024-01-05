describe("Single Deck Page", () => {
  it("a user can log in and see a single deck", () => {
    cy.visit("http://localhost:5000/");

    cy.get(`[data-testid="login-username"]`).type("Grandma");
    cy.get(`[data-testid="login-password"]`).type("1234");
    cy.get(`[data-testid="login-button"]`).click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/welcome/");
    });
    cy.get(`[data-testid="notebook-button"]`).first().click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        "http://localhost:5000/welcome/single-deck/Grandma's%20First%20Deck"
      );
    });
  });
});