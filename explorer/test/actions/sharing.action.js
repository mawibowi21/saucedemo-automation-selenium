const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

class SharingAction {
    constructor(driver) {
        this.driver = driver;
    }

    async fullPageScreenshot(fileName) {
        const screenshot = await this.driver.takeScreenshot();
        const actualPath = `screenshot/${fileName}.png`;
        const expectedPath = `screenshot/${fileName}_expected.png`;
        const diffPath = `screenshot/${fileName}_diff.png`;
        fs.writeFileSync(actualPath, screenshot, 'base64');
    }
    async partialScreenshot(element, fileName) {
        const partial = await this.driver.findElement(element).takeScreenshot();
        fs.writeFileSync('screenshot/' + fileName + '.png', partial, 'base64');
    }
}

module.exports = SharingAction;