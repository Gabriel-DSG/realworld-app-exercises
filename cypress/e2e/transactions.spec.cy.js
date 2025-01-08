describe('Transfer money with sufficient balance', () => {
    it('Should transfer 50 and update the balance correctly', () => {

        let balanceBefore
        let balanceAfter

        cy.visit('http://localhost:3000/')
        cy.get('#username').type('Dina20')
        cy.get('#password').type('s3cret')
        cy.get("[type='submit']").click()

        cy.get("[data-test='sidenav-user-balance']")
            .invoke('text')
            .then((capturedText) => {
                const cleanedText = capturedText.replace(/[^\d.-]/g, '').trim()
                balanceBefore = parseFloat(cleanedText)
                cy.log(`Balance before transfer: ${balanceBefore}`)
            });

        cy.get("[data-test='nav-top-new-transaction']").click()
        cy.get("[data-test='user-list-item-uBmeaz5pX']").click({ force: true })
        cy.get("[name='amount']").type('50')
        cy.get("[placeholder='Add a note']").type('Test Transfer')
        cy.get("[data-test='transaction-create-submit-payment']").click()
        cy.get('[data-test="alert-bar-success"]').should('be.visible').and('contain', 'Transaction Submitted!')

        cy.wait(1000)

        cy.get("[data-test='sidenav-user-balance']")
            .invoke('text')
            .then((capturedText) => {
                const cleanedText = capturedText.replace(/[^\d.-]/g, '').trim()
                balanceAfter = parseFloat(cleanedText)
                cy.log(`Balance after transfer: ${balanceAfter}`)

                const expectedBalance = balanceBefore - 50
                expect(balanceAfter).to.equal(expectedBalance)
            })
    })
})

describe('Send money with insufficient balance', () => {
    it('Should display an error message when trying to send money with insufficient balance', () => {

        let balanceBefore;

        cy.visit('http://localhost:3000/')
        cy.get('#username').type('Baba Yaga')
        cy.get('#password').type('test123')
        cy.get("[type='submit']").click()
        cy.wait(1500)

        cy.get('body').then(($body) => {
            if ($body.find('[data-test="user-onboarding-dialog-title"]').length > 0) {
                cy.get("[type='button']").eq(2).click()
                cy.get("[name='bankName']").type('Test Bank')
                cy.get("[name='routingNumber']").type('555666555')
                cy.get("[name='accountNumber']").type('198419841')
                cy.get("[type='submit']").click()
                cy.get("[type='button']").eq(2).click()
                cy.get("[data-test='nav-top-new-transaction']").click()
                cy.get("[data-test='user-list-item-uBmeaz5pX']").click({ force: true })
                cy.get("[name='amount']").type('50')
                cy.get("[placeholder='Add a note']").type('Test Transfer')
                cy.get("[data-test='transaction-create-submit-payment']")
                    .click()
                    .get('[data-test="alert-bar-success"]')
                    .wait(3000)
                    .should('not.exist')
            } else {
                cy.log('Onboarding dialog was not found.')

                cy.get("[data-test='sidenav-user-balance']")
                    .invoke('text')
                    .then((capturedText) => {
                        const cleanedText = capturedText.replace(/[^\d.-]/g, '').trim()
                        balanceBefore = parseFloat(cleanedText)
                        cy.log(`Balance before attempted transfer: ${balanceBefore}`)

                        if (balanceBefore === 0) {
                            cy.log('Insufficient balance to complete the transfer.')
                        }
                    })

                cy.get("[data-test='nav-top-new-transaction']").click()
                cy.get("[data-test='user-list-item-uBmeaz5pX']").click({ force: true })
                cy.get("[name='amount']").type('50');
                cy.get("[placeholder='Add a note']").type('Test Transfer')
                cy.get("[data-test='transaction-create-submit-payment']")
                    .click()
                    .get('[data-test="alert-bar-success"]')
                    .wait(3000)
                    .should('not.exist')
            }
        })
    })
})
