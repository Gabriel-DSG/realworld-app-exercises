class dashboardPage {
    selectorsList() {
        const selectors = {
            dashboardLogo: ".NavBar-logo",

        }
        return selectors
    }

    verifyDashboardLogo() {
        cy.get(this.selectorsList().dashboardLogo).should('be.visible')
    }


}


export default dashboardPage