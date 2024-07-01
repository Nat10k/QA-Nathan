import { Helper } from "codeceptjs";

class CustomHelper extends Helper {

  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']
  async getAllElements(locator:string) {
    const allElems = await document.querySelectorAll(locator);
    return allElems;
  }
}

export = CustomHelper;
