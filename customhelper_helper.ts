import { Helper } from "codeceptjs";

class CustomHelper extends Helper {

  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']
  async getAllElements(locator) {
    const {page} = this.helpers.Puppeteer;
    const allElems = await page.$$(locator);
    return allElems;
  }

}

export = CustomHelper;
