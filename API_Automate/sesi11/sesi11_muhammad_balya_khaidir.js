import { expect } from 'chai'
import { Builder, By, until } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js'
import fs from 'fs'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import {pages_element, sort_element} from './elementPages/element_pages.js'

describe ('Login and Sorting Test via Chrome', function () {
    let driver
    let setting = new chrome.Options()
    setting.addArguments('--incognito')

    before(async function () {
        driver = await new Builder().forBrowser('chrome').setChromeOptions(setting).build()
    })

    afterEach(async function () {
        await driver.sleep(2000)
    })

    after(async function () {
        await driver.quit()
    })

    it('Login Saucedemo dan check', async function () {
        // Launch web dengan chrome
        await driver.get('https://www.saucedemo.com')
        const judul = await driver.getTitle()

        // assert judul halaman login web sesuai ekspektasi
        expect(judul).to.equal('Swag Labs')

        // Input & action element
        let inputUsername = await driver.findElement(pages_element.inputUsername)
        let inputPassword = await driver.findElement(pages_element.inputPassword)
        let loginButton = await driver.findElement(pages_element.loginButton)
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
        
    })
    it('Sort Product from High to Low', async function () {
        
        // action element tombol sort harga besar - kecil
        let sorting = await driver.findElement(sort_element.sorting)
        await sorting.click()
        let chooseSorting = await driver.findElement(sort_element.chooseSorting)
        await chooseSorting.click()
        
        // assert text sorting yang ditampilkan sesuai ekspektasi
        let activeSort = await driver.findElement(By.xpath('//span[@class="active_option"]'))
        let sortText = await activeSort.getText()
        expect(sortText).to.equal('Price (high to low)')

    })
    it('Visual Test', async function () {
        let screenshot = await driver.takeScreenshot()
        let imgBuffer = Buffer.from(screenshot, "base64")
        fs.writeFileSync("current.png", imgBuffer)   

        // ambil baseline untuk komparasi
        // jika belum ada baseline, jadikan current.png sebagai baseline
        if (!fs.existsSync("baseline.png")) {
            fs.copyFileSync("current.png", "baseline.png")
            console.log("Baseline image saved.")
        }

        // Compare baseline.png dan current.png apakah sama
        let img1 = PNG.sync.read(fs.readFileSync("baseline.png"))
        let img2 = PNG.sync.read(fs.readFileSync("current.png"))
        let { width, height } = img1
        let diff = new PNG({ width, height })

        let numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 })

        fs.writeFileSync("diff.png", PNG.sync.write(diff))

        if (numDiffPixels > 0) {
            console.log(`Visual differences found! Pixels different: ${numDiffPixels}`)
        } else {
            console.log("No visual differences found.")
        }

        expect(numDiffPixels).to.equal(0, "Tidak ada perbedaan visual antara baseline dan current")

    })
})