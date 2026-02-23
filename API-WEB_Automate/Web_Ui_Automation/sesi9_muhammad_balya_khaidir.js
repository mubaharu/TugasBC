const { expect } = require('chai')
const { Builder, By, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

describe ('Login and Sorting Test via Chrome', function () {
    let driver
    setting = new chrome.Options()
    setting.addArguments('--incognito')

    it('Login Saucedemo dan check', async function () {
        // Launch web dengan chrome
        driver = await new Builder().forBrowser('chrome').setChromeOptions(setting).build()
        await driver.get('https://www.saucedemo.com')
        const judul = await driver.getTitle()

        // assert judul halaman login web sesuai ekspektasi
        expect(judul).to.equal('Swag Labs')

        // Input & action element
        let inputUsername = await driver.findElement(By.xpath('//*[@id="user-name"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let loginButton = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user')
        await inputPassword.sendKeys('secret_sauce')
        await loginButton.click()

        // cek dan tunggu element sort muncul
        let buttonSort = await driver.wait(until.elementLocated(By.className('product_sort_container')),2000)
        await buttonSort.isDisplayed()

        // assert judul halaman produk sesuai ekspektasi
        let textTittle = await driver.findElement(By.className('title'))
        let titleText = await textTittle.getText()
        expect(titleText).to.equal('Products')

        await driver.sleep(1800)

        // await driver.quit()
        
    })
    it('Sort Product from High to Low', async function () {
        
        // action element tombol sort harga besar - kecil
        let sorting = await driver.findElement(By.xpath('//select[@class="product_sort_container"]'))
        await sorting.click()
        let chooseSorting = await driver.findElement(By.xpath('//option[text()="Price (high to low)"]'))
        await chooseSorting.click()
        
        // assert text sorting yang ditampilkan sesuai ekspektasi
        let activeSort = await driver.findElement(By.xpath('//span[@class="active_option"]'))
        let sortText = await activeSort.getText()
        expect(sortText).to.equal('Price (high to low)')

        await driver.sleep(3000)
        await driver.quit()
    })
})