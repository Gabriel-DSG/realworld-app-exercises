describe('New user register sucess', () => {
  it('Should register a new user with valid info', () => {
    cy.visit('http://localhost:3000/')
    cy.get("[data-test='signup']").click()
    cy.get("#firstName").type('Alex')
    cy.get("#lastName").type('Terrible')
    cy.get("#username").type('Baba Yaga')
    cy.get("#password").type('test123')
    cy.get("#confirmPassword").type('test123')
    cy.get("[type='submit']").click()
    cy.get('.SignInForm-logo').should('be.visible')

  });
});

describe('Try to register a new user with incomplete informations', () => {
  it('The button should not be available if all the fields are not filled correctly', () => {
    cy.visit('http://localhost:3000/')
    cy.get("[data-test='signup']").click()
    cy.get("#firstName").type('Axl')
    cy.get("#lastName").type('Rose')
    cy.get("#password").type('test123')
    cy.get("#confirmPassword").type('test123')
    cy.get("[type='submit']").should('be.disabled');
  });
});

describe('Login sucess', () => {
  it('Should Login with valid user', () => {

    cy.visit('http://localhost:3000/')
    cy.get('#username').type('Baba Yaga')
    cy.get('#password').type('test123')
    cy.get("[type='submit']").click()
    cy.get('.NavBar-logo').should('be.visible')
  });
});

describe('Login with invalid credentials', () => {
  it('A error message should appears when try to login with a invalid user', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#username').type('Corey')
    cy.get('#password').type('Slipknot')
    cy.get("[type='submit']").click()
    cy.get("[role='alert']").should('include.text', 'Username or password is invalid')
  });
});

