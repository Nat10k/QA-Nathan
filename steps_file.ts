import * as dotenv from 'dotenv';

dotenv.config({path:'./facebook_test/.env'});
const facebookEmail = process.env.FACEBOOK_EMAIL;
const facebookPassword = process.env.FACEBOOK_PASSWORD;

dotenv.config({path:'./twitter_test/.env'});
const twitterEmail = process.env.TWITTER_EMAIL;
const twitterPassword = process.env.TWITTER_PASSWORD;

dotenv.config({path:'./spotify_test/.env'});
const spotifyUsername = process.env.SPOTIFY_EMAIL;
const spotifyPassword = process.env.SPOTIFY_PASSWORD;

// in this file you can append custom step methods to 'I' object

const waitTime = 10;
export = function() {
  return actor({
      openSignUpSpotify: function() {
        this.amOnPage('https://open.spotify.com/');
        this.click('Sign up');
        this.wait(waitTime);
      },
      openLogInSpotify: function() {
        this.amOnPage('https://open.spotify.com/');
        this.click('Log in');
        this.wait(waitTime);
      },
      loginTwitter: function() {
        this.amOnPage('/');
        this.scrollPageToBottom();
        this.wait(2);
        this.click('Sign in');
        this.fillField('Phone, email, or username', twitterEmail);
        this.click('Next');
        pause(); // Handle suspicious login activity
        this.fillField('password', secret(twitterPassword));
        this.wait(2);
        this.click('Log in');
        this.wait(1);
        this.waitForText('What is happening?!',waitTime);
      },
      loginFacebook: function() {
        this.say('Logging in Facebook');
        this.amOnPage('/');
        this.fillField('email', facebookEmail);
        this.fillField('pass', secret(facebookPassword));
        this.click('Log in');
        this.wait(waitTime);
      },
      loginSpotify: function() {
        // Search based on id
        I.openLogInSpotify();
        I.fillField('#login-username', spotifyUsername);
        I.fillField('#login-password', secret(facebookPassword));
        I.click('Masuk');
        I.wait(waitTime);
      }
  });
}
