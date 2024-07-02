import * as dotenv from 'dotenv';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const password = process.env.FACEBOOK_PASSWORD;

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
      },
      loginFacebook: function() {
        this.amOnPage('/');
        this.fillField('email', email);
        this.fillField('pass', password);
        this.click('Log in');
        this.wait(waitTime);
      }
  });
}
