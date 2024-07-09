import * as dotenv from 'dotenv';

dotenv.config({path:'./six_test/.env'});
const email = process.env.SIX_EMAIL;
const password = process.env.SIX_PASSWORD;
const waitTime = 5;

Feature('login six');

Scenario('empty fields', async ({ I }) => {
    I.amOnPage('https://six.itb.ac.id/');
    I.click('Login');
    I.wait(waitTime);
    I.click('Login dengan ITB Account');
    I.wait(waitTime);
    I.click('Next');
    I.see('Enter a valid email address, phone number, or Skype name.');
    I.fillField('loginfmt', email);
    I.click('Next');
    I.wait(waitTime);
    I.click('Sign in');
    I.see('Please enter your password.');
}).tag('@six');

Scenario('invalid email and password',  async ({ I }) => {
    I.amOnPage('https://six.itb.ac.id/');
    I.click('Login');
    I.wait(waitTime);
    I.click('Login dengan ITB Account');
    I.wait(waitTime);
    I.fillField('loginfmt', 'jipdosfh8eugruykqgkjgK');
    I.click('Next');
    I.see('We couldn\'t find an account with that username.');
    I.fillField('loginfmt', 'dobibu@gmail.com');
    I.click('Next');
    I.see('We couldn\'t find an account with that username.');
    I.fillField('loginfmt', 'dobibu@com');
    I.click('Next');
    I.see('Enter a valid email address, phone number, or Skype name.');
    I.fillField('loginfmt', email);
    I.click('Next');
    
    I.wait(waitTime);
    I.fillField('passwd', 'hgp9r8y3289yeuigdvbajkuo@Gibkljda');
    I.click('Sign in');
    I.waitForText('Your account or password is incorrect.',20);
}).tag('@six');

Scenario('complete login',  async ({ I }) => {
    I.amOnPage('https://six.itb.ac.id/');
    I.click('Login');
    I.wait(waitTime);
    I.click('Login dengan ITB Account');
    I.wait(waitTime);
    I.fillField('loginfmt', email);
    I.click('Next');
    I.wait(waitTime);
    I.fillField('passwd', secret(password));
    I.click('Sign in');
    I.say('Please authenticate login');
    pause();
    I.waitForText('Status Mahasiswa', 10);
}).tag('@six');

Scenario('logout',  async ({ I }) => {
    I.click(locate('a').withAttr({'data-toggle':'dropdown'}).last());
    I.click(locate('a').withAttr({'href':'/logout'}));
    I.waitForText(email, 10);
    I.click(locate('div').withAttr({'data-test-id':email}));
    I.waitForText('Login', 10);
}).tag('@six');