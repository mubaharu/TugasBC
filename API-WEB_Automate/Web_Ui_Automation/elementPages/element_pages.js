import { By } from 'selenium-webdriver'

export class pages_element {
    static inputUsername = By.xpath('//*[@id="user-name"]')
    static inputPassword = By.xpath('//*[@data-test="password"]')
    static loginButton = By.className('submit-button btn_action')
}

export class sort_element {
    static sorting = By.xpath('//select[@class="product_sort_container"]')
    static chooseSorting = By.xpath('//option[text()="Price (high to low)"]')
}

// export default pages_element
// export default sort_element