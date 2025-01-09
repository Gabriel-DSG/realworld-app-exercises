import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage.js'
import RegisterPage from '../pages/registerPage.js'
import DashboardPage from '../pages/dashboardPage.js'

const loginPage = new LoginPage
const registerPage = new RegisterPage
const dashboardPage = new DashboardPage

describe('New User Registration Success', () => {
  it('Should register a new user with valid information', () => {
    loginPage.accessLoginPage()
    loginPage.accessRegisterPage()
    registerPage.registerNewUser(userData.userRegisterSuccess.firstName, userData.userRegisterSuccess.lastName, userData.userRegisterSuccess.username, userData.userRegisterSuccess.password, userData.userRegisterSuccess.confirmPassword)
    loginPage.verifyLoginPage()
  })
})

describe('Register with Incomplete Information', () => {
  it('The submit button should be disabled if not all fields are filled correctly', () => {
    loginPage.accessLoginPage()
    loginPage.accessRegisterPage()
    registerPage.userRegisterFail(userData.userRegisterFail.firstName, userData.userRegisterFail.username, userData.userRegisterFail.password)
  })
})

describe('Login Success', () => {
  it('Should login with valid credentials', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithUser(userData.userSuccess.username, userData.userSuccess.password)
    dashboardPage.verifyDashboardLogo()
  })
})

describe('Login with Invalid Credentials', () => {
  it('An error message should appear when trying to login with invalid credentials', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithUser(userData.userFail.username, userData.userFail.password)
    loginPage.checkAccessInvalid()
  })
})
