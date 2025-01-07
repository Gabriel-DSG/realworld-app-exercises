describe('New User Registration Success', () => {
  it('Should register a new user with valid information', () => {
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

describe('Register with Incomplete Information', () => {
  it('The submit button should be disabled if not all fields are filled correctly', () => {
    cy.visit('http://localhost:3000/')
    cy.get("[data-test='signup']").click()
    cy.get("#firstName").type('Axl')
    cy.get("#lastName").type('Rose')
    cy.get("#password").type('test123')
    cy.get("#confirmPassword").type('test123')
    cy.get("[type='submit']").should('be.disabled')
  });
});

describe('Login Success', () => {
  it('Should login with valid credentials', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#username').type('Baba Yaga')
    cy.get('#password').type('test123')
    cy.get("[type='submit']").click()
    cy.get('.NavBar-logo').should('be.visible')
  });
});

describe('Login with Invalid Credentials', () => {
  it('An error message should appear when trying to login with invalid credentials', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#username').type('Corey')
    cy.get('#password').type('Slipknot')
    cy.get("[type='submit']").click()
    cy.get("[role='alert']").should('include.text', 'Username or password is invalid')
  });
});
