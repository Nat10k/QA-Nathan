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

dotenv.config({path:'./six_test/.env'});
const sixEmail = process.env.SIX_EMAIL;
const sixPassword = process.env.SIX_PASSWORD;

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
        this.amOnPage('https://x.com/?lang=en');
        this.scrollPageToBottom();
        this.wait(2);
        this.click('Sign in');
        this.fillField('Phone, email, or username', twitterEmail);
        this.click('Next');
        this.say('Please handle captcha');
        pause(); // Handle suspicious login activity
        this.fillField('password', secret(twitterPassword));
        this.wait(2);
        this.click('Log in');
        this.wait(1);
        this.waitForText('What is happening?!',waitTime);
      },
      loginFacebook: function() {
        this.amOnPage('/');
        this.fillField('email', facebookEmail);
        this.fillField('pass', secret(facebookPassword));
        this.click('Log in');
        this.wait(waitTime);
      },
      loginSpotify: function() {
        this.openLogInSpotify();
        this.fillField('#login-username', spotifyUsername);
        this.fillField('#login-password', secret(spotifyPassword));
        this.click('Masuk');
        this.wait(waitTime);
      },
      loginSIX: function() {
        this.amOnPage('https://six.itb.ac.id/');
        this.click('Login');
        this.wait(2);
        this.click('Login dengan ITB Account');
        this.wait(3);
        this.fillField(locate('input').withAttr({name:'loginfmt'}), sixEmail);
        this.click('Next');
        this.wait(5);
        this.fillField(locate('input').withAttr({name:'passwd'}), secret(sixPassword));
        this.click('Sign in');
        this.say('Please authenticate login');
        pause();
        this.waitForText('Status Mahasiswa', 10);
      }
  });
}
