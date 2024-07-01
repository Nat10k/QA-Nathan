import * as dotenv from 'dotenv';

dotenv.config({path:'./twitter_test/.env'});
const email = process.env.TWITTER_EMAIL;
const password = process.env.TWITTER_PASSWORD;

// in this file you can append custom step methods to 'I' object

const waitTime = 10;
export = function() {
  return actor({
      openSignUp: function() {
        this.amOnPage('/');
        this.click('Sign up');
        this.wait(waitTime);
      },
      openLogIn: function() {
        this.amOnPage('/');
        this.click('Log in');
        this.wait(waitTime);
      },
      loginTwitter: function() {
        this.amOnPage('/');
        this.scrollPageToBottom();
        this.wait(2);
        this.click('Sign in');
        this.fillField('Phone, email, or username', email);
        this.click('Next');
        pause(); // Handle suspicious login activity
        this.fillField('password', password);
        this.wait(2);
        this.click('Log in');
        this.wait(1);
        this.waitForText('What is happening?!',waitTime);
      }
  });
}
