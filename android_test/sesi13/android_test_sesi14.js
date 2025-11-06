import { expect } from 'chai'

describe('Android Testing Appium', () => {

    before(async () => {
        await browser.execute('mobile: activateApp', { appId: 'io.appium.android.apis' })
    })

    it('Input element Text Entry', async () => {
        const klikApp = await $(`//android.widget.TextView[@content-desc="App"]`)
        const klikAlertDialog = await $(`//android.widget.TextView[@content-desc="Alert Dialogs"]`)
        const klikTextEntry = await $(`//android.widget.Button[@content-desc="Text Entry dialog"]`)

        await klikApp.click()
        await klikAlertDialog.click()
        await klikTextEntry.click()

        const name = await $(`//android.widget.EditText[@resource-id="io.appium.android.apis:id/username_edit"]`)
        const passw = await $(`//android.widget.EditText[@resource-id="io.appium.android.apis:id/password_edit"]`)

        await name.setValue('balya3')
        await passw.setValue('390cireng')
    })
})