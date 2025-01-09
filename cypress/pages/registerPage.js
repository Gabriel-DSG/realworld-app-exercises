class registerPage {
    selectorsList() {
        const selectors = {
            firstNameField: "#firstName",
            lastNameField: '#lastName',
            usernameField: "#username",
            passwordField: "#password",
            confirmPasswordField: "#confirmPassword",
            registerButton: "[type='submit']",


        }
        return selectors
    }

    registerNewUser(firstName, lastName, username, password) {
        cy.get(this.selectorsList().firstNameField).type(firstName)
        cy.get(this.selectorsList().lastNameField).type(lastName)
        cy.get(this.selectorsList().usernameField).type(username)
        cy.get(this.selectorsList().passwordField).type(password)
        cy.get(this.selectorsList().confirmPasswordField).type(password)
        cy.get(this.selectorsList().registerButton).click()

    }

    userRegisterFail(firstName, username, password) {
        cy.get(this.selectorsList().firstNameField).type(firstName)
        cy.get(this.selectorsList().usernameField).type(username)
        cy.get(this.selectorsList().passwordField).type(password)
        cy.get(this.selectorsList().registerButton).should('be.disabled')
    }


}

export default registerPage