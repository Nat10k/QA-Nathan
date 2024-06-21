/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type Custom = import('./custom_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends Puppeteer, FileSystem, Custom {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
