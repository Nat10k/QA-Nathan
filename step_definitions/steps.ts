import * as dotenv from 'dotenv';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const password = process.env.FACEBOOK_PASSWORD;

const { I } = inject();
// Add in your custom step files

Given('I am on the login page', () => {
  // From "features\basic.feature" {"line":7,"column":5}
  I.amOnPage('/');
});

When('I enter my username and password', () => {
  // From "features\basic.feature" {"line":8,"column":5}
  I.fillField('email', email);
  I.fillField('pass', password);
});

When('I click Log In', () => {
  // From "features\basic.feature" {"line":9,"column":5}
  I.click('Log in');
  I.wait(5);
});

Then('I should see my Facebook dashboard', () => {
  // From "features\basic.feature" {"line":9,"column":5}
  I.see('Selamat datang di Facebook');
});
