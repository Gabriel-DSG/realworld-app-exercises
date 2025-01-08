describe.only('View transaction history successfully', () => {
    it('Should correctly display the transaction history of a user', () => {
        cy.visit('http://localhost:3000/')
        cy.get('#username').type('Arvilla_Hegmann')
        cy.get('#password').type('s3cret')
        cy.get("[type='submit']").click()
        cy.get("[data-test='nav-personal-tab']").click()
        cy.get("[data-test='transaction-item-2Lz6Q3zj4Rb']").should('be.visible')
        cy.get("[data-test='transaction-item-bmMxZMrlE_a']").should('be.visible')

    })
})


describe('Attempt to view transaction history with no previous transactions', () => {
    it('Should display a message indicating that the user has no previous transactions', () => {
        cy.visit('http://localhost:3000/')
        cy.get("[data-test='signup']").click()
        cy.get("#firstName").type('Axl')
        cy.get("#lastName").type('Rose')
        cy.get("#username").type('AXL')
        cy.get("#password").type('test1984')
        cy.get("#confirmPassword").type('test1984')
        cy.get("[type='submit']").click()
        cy.get('.SignInForm-logo').should('be.visible')
        cy.get('#username').type('AXL')
        cy.get('#password').type('test1984')
        cy.get("[type='submit']").click()

        cy.get('body').then(($body) => {
            if ($body.find('[data-test="user-onboarding-dialog-title"]').length > 0) {
                cy.get("[type='button']").eq(2).click()
                cy.get("[name='bankName']").type('Test Bank')
                cy.get("[name='routingNumber']").type('555666555')
                cy.get("[name='accountNumber']").type('198419841')
                cy.get("[type='submit']").click()
                cy.get("[type='button']").eq(2).click()
                cy.get("[data-test='nav-personal-tab']").click()
                cy.get("[data-test='empty-list-header']").should('contain', 'No Transactions')
            } else {
                cy.get("[data-test='nav-personal-tab']").click()
                cy.get("[data-test='empty-list-header']").should('contain', 'No Transactions')
            }
        })
    })
})
