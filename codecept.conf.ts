import * as dotenv from 'dotenv';
import Groq from 'groq-sdk';
dotenv.config({path:'.env'});
require('./heal');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'https://www.facebook.com',
      show: true,
      restart: false,
      windowSize: '1024x680',
      waitForNavigation: 'networkidle0',
      waitForAction: 1500,
      keepCookies: true,
      chrome: {
        args: [
          '--no-sandbox',
          '--window-size=1024,550',
          '--disable-notifications',
          '--use-fake-ui-for-media-stream'
        ]
      }
    },
    FileSystem: {},
    CustomHelper: {
      require: './customhelper_helper.ts'
    }
  },
  include: {
    I: './steps_file'
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.ts',
            './step_definitions/marketplace_steps.ts'
    ]
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    heal: {
      enabled: true
    },
    autoDelay: {
      enabled: true
    },
    autoLogin: {
      enabled: true,
      saveToFile: true,
      inject: 'login',
      users: {
        user: {
          login: (I : any) => {I.loginFacebook()},
          check: (I : any) => {
            I.amOnPage('/?sk=welcome');
            I.dontSee('Log in');
          },
          fetch: () => {},
          restore: () => {}
        }
      }
    },
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    },
    retryTo: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {}
  },
  ai: {
    request: async (messages) => {
      const chatCompletion = await groq.chat.completions.create({
          messages,
          model: "mixtral-8x7b-32768",
      });
      return chatCompletion.choices[0]?.message?.content || "";
    }
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
  ],
  tests: './*_test/*_test.ts',
  name: 'QA'
}