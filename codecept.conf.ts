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
      windowSize: '1024x950',
      waitForNavigation: 'networkidle0',
      waitForAction: 1500,
      keepCookies: true,
      chrome: {
        args: [
          '--no-sandbox',
          '--window-size=1024,900',
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
  mocha: {
    reporterOptions: {
        reportDir: "output"
    }
  },
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.ts',
            './step_definitions/marketplace_steps.ts',
            './step_definitions/spotify_steps.ts'
    ]
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    testomatio: {
      enabled: true,
      require: '@testomatio/reporter/lib/adapter/codecept',
      apiKey: process.env.TESTOMATIO,
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
        facebook: {
          login: (I : any) => {I.loginFacebook()},
          check: (I : any) => {
            I.amOnPage('/?sk=welcome');
            I.dontSee('Log in');
          },
          fetch: () => {return "test"},
          restore: () => {}
        },
        twitter: {
          login: (I : any) => {I.loginTwitter()},
          check: (I : any) => {
            I.amOnPage('https://x.com/home?lang=en');
            I.see('What is happening?!');
          },
          fetch: () => {return "test"},
          restore: () => {}
        },
        spotify: {
          login: (I : any) => {I.loginSpotify()},
          check: (I : any) => {
            I.amOnPage('https://open.spotify.com/');
            I.dontSee('Log in');
          },
          fetch: () => {return "test"},
          restore: () => {}
        },
        six: {
          login: (I : any) => {I.loginSIX()},
          check: (I : any) => {
            I.amOnPage('https://six.itb.ac.id/home');
            I.see('Status Mahasiswa');
          },
          fetch: () => {return "test"},
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
          model: "llama3-8b-8192",
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