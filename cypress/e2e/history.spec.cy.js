import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage.js'
import RegisterPage from '../pages/registerPage.js'
import DashboardPage from '../pages/dashboardPage.js'

const loginPage = new LoginPage()
const registerPage = new RegisterPage()
const dashboardPage = new DashboardPage()

describe('View transaction history successfully', () => {
    it('Should correctly display the transaction history of a user', () => {
        loginPage.accessLoginPage()
        loginPage.loginWithUser(
            userData.userSuccess.username,
            userData.userSuccess.password
        )
        dashboardPage.verifyPaymentHistoryWithTransactions()
    })
})

describe.only('Attempt to view transaction history with no previous transactions', () => {
    it('Should display a message indicating that the user has no previous transactions', () => {
        loginPage.accessLoginPage()
        loginPage.accessRegisterPage()
        registerPage.registerNewUser(
            userData.userRegisterEmptyHistory.firstName,
            userData.userRegisterEmptyHistory.lastName,
            userData.userRegisterEmptyHistory.username,
            userData.userRegisterEmptyHistory.password,
            userData.userRegisterEmptyHistory.confirmPassword
        )
        loginPage.loginWithUser(
            userData.userLoginEmptyHistory.username,
            userData.userLoginEmptyHistory.password
        )
        dashboardPage.verifyOnboardingDialog(
            userData.bankInfo.bankName,
            userData.bankInfo.routingNumber,
            userData.bankInfo.accountNumber
        )
        dashboardPage.verifyPaymentHistoryNoTransactions()


    })
})
