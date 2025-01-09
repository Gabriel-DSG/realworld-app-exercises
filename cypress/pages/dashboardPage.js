class dashboardPage {
    selectorsList() {
        const selectors = {
            dashboardLogo: ".NavBar-logo",
            userBalance: "[data-test='sidenav-user-balance']",
            newTransactionButton: "[data-test='nav-top-new-transaction']",
            contactToTransferMoney: "[data-test='user-list-item-uBmeaz5pX']",
            amountField: "[name='amount']",
            noteField: "[placeholder='Add a note']",
            sendTransferButton: "[data-test='transaction-create-submit-payment']",
            successAlert: '[data-test="alert-bar-success"]',
            body: "body",
            onboardingDialog: '[data-test="user-onboarding-dialog-title"]',
            onboardingNextButton: "[type='button']",
            bankNameField: "[name='bankName']",
            routingNumberField: "[name='routingNumber']",
            accountNumberField: "[name='accountNumber']",
            onboardingSubmitButton: "[type='submit']",
            onboardingDialogCloseButton: "[type='button']",
            personalTabOption: "[data-test='nav-personal-tab']",
            paymentHistory: "[data-test='transaction-item-2Lz6Q3zj4Rb'], [data-test='transaction-item-bmMxZMrlE_a']",
            emptyHistorySection: "[data-test='empty-list-header']",


        }
        return selectors
    }


    verifyDashboardLogo() {
        cy.get(this.selectorsList().dashboardLogo).should('be.visible')
    }

    sendPaymentWithPositiveBalance() {
        cy.get(this.selectorsList().newTransactionButton).click()
        cy.get(this.selectorsList().contactToTransferMoney).click({ force: true })
        cy.get(this.selectorsList().amountField).type('50')
        cy.get(this.selectorsList().noteField).type('Payment')
        cy.get(this.selectorsList().sendTransferButton).click()
        cy.get(this.selectorsList().successAlert).should('be.visible').and('contain', 'Transaction Submitted!')
        cy.wait(1000)
    }

    getBalanceBefore() {
        cy.get(this.selectorsList().userBalance)
            .invoke('text')
            .then((capturedText) => {
                const cleanedText = capturedText.replace(/[^\d.-]/g, '').trim()
                this.balanceBefore = parseFloat(cleanedText)
                cy.log(`Balance before transfer: ${this.balanceBefore}`)
            })
    }

    getBalanceAfter() {
        cy.get(this.selectorsList().userBalance)
            .invoke('text')
            .then((capturedText) => {
                const cleanedText = capturedText.replace(/[^\d.-]/g, '').trim()
                const balanceAfter = parseFloat(cleanedText)
                cy.log(`Balance after transfer: ${balanceAfter}`)

                const expectedBalance = this.balanceBefore - 50
                expect(balanceAfter).to.equal(expectedBalance)
            })
    }

    verifyOnboardingDialog(bankName, routingNumber, accountNumber) {
        cy.wait(1000)
        cy.get(this.selectorsList().body).then(($body) => {
            if ($body.find(this.selectorsList().onboardingDialog).length > 0) {

                cy.get(this.selectorsList().onboardingNextButton).eq(2).click()
                cy.get(this.selectorsList().bankNameField).type(bankName)
                cy.get(this.selectorsList().routingNumberField).type(routingNumber)
                cy.get(this.selectorsList().accountNumberField).type(accountNumber)
                cy.get(this.selectorsList().onboardingSubmitButton).click()
                cy.get(this.selectorsList().onboardingDialogCloseButton).eq(2).click()

            }
        })

    }

    sendPaymentWithZeroBalance() {
        cy.get(this.selectorsList().newTransactionButton).click()
        cy.get(this.selectorsList().contactToTransferMoney).click({ force: true })
        cy.get(this.selectorsList().amountField).type('50')
        cy.get(this.selectorsList().noteField).type('Payment')
        cy.get(this.selectorsList().sendTransferButton).click()
            .get(this.selectorsList().successAlert)
            .wait(3000)
            .should('not.exist')
    }

    verifyPaymentHistoryWithTransactions() {
        cy.get(this.selectorsList().personalTabOption).click()
        cy.get(this.selectorsList().paymentHistory).should('be.visible')

    }

    verifyPaymentHistoryNoTransactions() {
        cy.get(this.selectorsList().personalTabOption).click()
        cy.get(this.selectorsList().emptyHistorySection).should('contain', 'No Transactions')

    }

}

export default dashboardPage