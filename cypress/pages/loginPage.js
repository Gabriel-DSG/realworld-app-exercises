class loginPage {
    selectorsList() {
        const selectors = {
            usernameField: "#username",
            passwordField: '#password',
            loginButton: "[type='submit']",
            wrongCredentialAlert: "[role='alert']",
            registerButton: "[data-test='signup']",
            loginPageLogo: ".SignInForm-logo",
        }
        return selectors
    }

    accessLoginPage() {
        cy.visit('/')
    }

    loginWithUser(username, password) {
        cy.get(this.selectorsList().usernameField).type(username)
        cy.get(this.selectorsList().passwordField).type(password)
        cy.get(this.selectorsList().loginButton).click()

    }

    checkAccessInvalid() {
        cy.get(this.selectorsList().wrongCredentialAlert).should('include.text', 'Username or password is invalid')
    }

    accessRegisterPage() {
        cy.get(this.selectorsList().registerButton).click()
    }

    verifyLoginPage() {
        cy.get(this.selectorsList().loginPageLogo).should('be.visible')
    }


}

export default loginPage