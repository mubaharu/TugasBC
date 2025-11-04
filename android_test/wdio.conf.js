export const config = {
  runner: 'local',
  specs: ['./sesi13/*.js'],
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'JRMBNFNJZXOJOJPR', // silahkan diisi dengan device masing-masing
    'appium:platformVersion': '13', // silahkan diisi dengan platform version masing-masing
    'appium:automationName': 'UiAutomator2',
    'appium:appPackage': 'io.appium.android.apis',
    'appium:appActivity': '.ApiDemos',
    'appium:noReset': true
  }],
  logLevel: 'info',
  framework: 'mocha',
  reporters: ['spec', ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false
  }]],
  hostname: 'localhost',
  port: 4723,
  path: '/',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  afterTest: async function (_, __, { passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  }
};
