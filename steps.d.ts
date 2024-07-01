/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type CustomHelper = import('./customhelper_helper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, login: any }
  interface Methods extends Puppeteer, FileSystem, CustomHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
