describe('Transfer money with sufficient balance', () => {
    it('Should tranfer the money with success', () => {
        cy.visit('http://localhost:3000/')
        cy.get('#username').type('Baba Yaga')
        cy.get('#password').type('test123')
        cy.get("[type='submit']").click()
        cy.get('.NavBar-logo').should('be.visible')

        // Passar pelo formulario de novos usuarios
        // cy.get("[type='button']").eq(2).click()
        // cy.get("[name='bankName']").type('Test Bank')
        // cy.get("[name='routingNumber']").type('555666555')
        // cy.get("[name='accountNumber']").type('198419841')
        // cy.get("[type='submit']").click()
        // cy.get("[type='button']").eq(2).click()
    });
});

