import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './*_test/*_test.ts',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'https://x.com/?lang=en',
      show: true,
      restart: false,
      windowSize: '1024x680',
      waitForNavigation: 'networkidle0',
      waitForAction: 1500,
      keepCookies: true,
      chrome: {
        args: ['--no-sandbox', '--window-size=1024,550', '--disable-notifications', '--use-fake-ui-for-media-stream'],
      }
    },
    FileSystem: {},
    CustomHelper: {
      require: './customhelper_helper.ts',
    },
  },
  plugins: {
    autoDelay: {
      enabled: true
    },
    autoLogin: {
      enabled: true,
      saveToFile: true,
      inject: 'login',
      users: {
        user: {
          // loginAdmin function is defined in `steps_file.js`
          login: (I) => I.loginTwitter(),
          // if we see `Admin` on page, we assume we are logged in
          check: (I) => {
             I.seeElement({css:'[data-testid="AppTabBar_Home_Link"]'});
          },
          fetch: () => {}, // empty function
          restore: () => {}, // empty funciton
        }
        
      }
    }
 },
  include: {
    I: './steps_file'
  },
  name: 'QA'
}