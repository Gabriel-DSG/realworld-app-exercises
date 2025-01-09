import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage.js'
import RegisterPage from '../pages/registerPage.js'
import DashboardPage from '../pages/dashboardPage.js'

const loginPage = new LoginPage
const registerPage = new RegisterPage
const dashboardPage = new DashboardPage

describe('Transfer money with sufficient balance', () => {
    it('Should transfer 50 and update the balance correctly', () => {

        loginPage.accessLoginPage()
        loginPage.loginWithUser(
            userData.userPositiveBalance.username,
            userData.userPositiveBalance.password
        )
        dashboardPage.getBalanceBefore()
        dashboardPage.sendPaymentWithPositiveBalance()
        dashboardPage.getBalanceAfter()

    })
})

describe('Send money with insufficient balance', () => {
    it('Should display an error message when trying to send money with insufficient balance', () => {
        loginPage.accessLoginPage()
        loginPage.accessRegisterPage()
        registerPage.registerNewUser(
            userData.userRegisterSuccess.firstName,
            userData.userRegisterSuccess.lastName,
            userData.userRegisterSuccess.username,
            userData.userRegisterSuccess.password,
            userData.userRegisterSuccess.confirmPassword
        )
        loginPage.loginWithUser(
            userData.userZeroBalance.username,
            userData.userZeroBalance.password
        )
        dashboardPage.verifyOnboardingDialog(
            userData.bankInfo.bankName,
            userData.bankInfo.routingNumber,
            userData.bankInfo.accountNumber
        )
        dashboardPage.sendPaymentWithZeroBalance()
    })
})

