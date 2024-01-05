describe("Welcome Page", () => {
  it("a user can log in", () => {
    cy.visit("http://localhost:5000/");
    // cy.getByData("login-username").type("Grandma");
    cy.get(`[data-testid="login-username"]`).type("Grandma");
    // cy.getByData("login-password").type("1234");
    cy.get(`[data-testid="login-password"]`).type("1234");
    // cy.getByData("login-button").click();
    cy.get(`[data-testid="login-button"]`).click();
    cy.wait(1000);
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5000/welcome/");
    });
  });
});