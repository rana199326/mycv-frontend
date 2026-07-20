import { faker } from "@faker-js/faker";

describe("Should redirect to login page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/register");
  });

  it("Should load succesfully my register page", () => {
    cy.visit("http://localhost:5173/register");
  });

  it("Should have the text Inscription", () => {
    cy.contains("Inscription");
  });

  it("Should fill the form and submit", () => {
    const fakeFirstName = faker.name.firstName();
    const fakeLastName = faker.name.lastName();
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password({ length: 12 });

    cy.get('[role=register-firstname-input]').type(fakeFirstName);
    cy.get('[role=register-lastname-input]').type(fakeLastName);
    cy.get('[role=register-email-input]').type(fakeEmail);
    cy.get('[role=register-password-input]').type('L123456789');
    cy.get('[role=register-confirm-password-input]').type('L123456789');
    cy.get('[data-cy=register-submit-button]').click();
    cy.url().should("include", "/login");
    cy.contains("J'ai déjà un espace, je me connecte");
  });
});
