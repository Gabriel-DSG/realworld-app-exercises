describe('Login com sucesso', () => {
    it('Deve fazer login com um usuário válido', () => {
      
      cy.visit('http://localhost:3000/')
      cy.get('#username').type('Baba Yaga')
      cy.get('#password').type('test123')
      cy.get("[type='submit']").click()
      cy.get('.NavBar-logo').should('be.visible')
    });
  });
