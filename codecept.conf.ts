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
      url: 'https://open.spotify.com',
      show: true,
      restart: false,
      windowSize: '1024x768',
      waitForNavigation: 'networkidle0',
      waitForAction: 1500,
      chrome: {
        args: ['--no-sandbox', '--window-size=1024,768', '--disable-notifications'],
      }
    },
    FileSystem: {}
  },
  include: {
    I: './steps_file'
  },
  name: 'QA'
}