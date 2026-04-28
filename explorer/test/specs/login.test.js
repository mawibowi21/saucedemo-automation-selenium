const { Builder } = require('selenium-webdriver');
const LoginAction = require('../actions/login.action');
const SharingAction = require('../actions/sharing.action');
const Loginpage = require('../pageobjects/login.page');
describe('Login', () => {
    let driver; 
    let loginAction;
    let sharingAction;

    beforeEach(async () => {
        driver = new Builder()
            .forBrowser('chrome')
            .build();

        loginAction = new LoginAction(driver);
        sharingAction = new SharingAction(driver);
        await loginAction.openUrl('https://www.saucedemo.com/');
    })

    afterEach(async () => {
        await driver.quit();
    })
    //positive
    it('Login with valid credential', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginSuccess('Products');

        await sharingAction.fullPageScreenshot('login_positive')
    });
    //uname salah (kosong) password benar
    it('Login with empty username', async () => {
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username is required');

        await sharingAction.fullPageScreenshot('login_empty_username')
    });
    //uname benar password salah (kosong)
    it('Login with empty password', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Password is required');

        await sharingAction.fullPageScreenshot('login_empty_password');
    });
    //login pakai locked out user
    it('Login with empty locked out user', async () => {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Sorry, this user has been locked out.');
        
        await sharingAction.fullPageScreenshot('login_locked_out_user');
    });
})