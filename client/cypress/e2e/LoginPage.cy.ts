describe("Login Page", () => {
  it("the h1 contains the correct text", () => {
    cy.visit("http://localhost:5000/");
    cy.get(`[data-testid="login-h1"]`).contains("Welcome to the Flash Card App!");
  });
});