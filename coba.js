const chrome = require('selenium-webdriver/chrome')
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
let options = new chrome.Options();
describe('SauceDemo automation test', function () {
    let driver;

    it('logs in with standard_user using XPath locators', async function () {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        try { //login
            await driver.get('https://www.saucedemo.com');
            await driver.findElement(By.id("user-name")).sendKeys("standard_user");
            await driver.findElement(By.id("password")).sendKeys("secret_sauce");
            await driver.findElement(By.id("login-button")).click();
        //low to high (acak dulu)
            await driver.findElement(By.xpath("//select[@data-test='product-sort-container']"));
            await driver.findElement(By.xpath("//option[text()='Price (low to high)']")).click();
            await driver.sleep(1500); //jeda
        // sorting a-z
            await driver.findElement(By.xpath("//select[@data-test='product-sort-container']")).click();
            await driver.findElement(By.xpath("//option[@value='az']")).click();
            await driver.sleep(1500);
            
            const title = await driver.findElement(By.className('title')).getText();
            assert.strictEqual(title, 'Products'); 
            console.log("Login verified");

        } catch (error) {
            console.log("Ada error:", error);
        } finally {
            await driver.quit();}
    });
});