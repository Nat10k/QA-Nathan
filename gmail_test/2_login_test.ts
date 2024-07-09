import * as dotenv from 'dotenv';

dotenv.config({path:'./gmail_test/.env'});
const email = process.env.GMAIL_EMAIL;
const password = process.env.GMAIL_PASSWORD;
const baseURL = "https://gmail.com/"

Feature('login gmail');

Before(({ I }) => {
    I.amOnPage(baseURL);
    I.see('Sign in');
    I.click('Sign in');
    I.wait(3);
});

Scenario('empty fields', async ({ I }) => {
    I.click('Next');
    I.see('Enter an email or phone number');
    I.fillField('Email or phone', email);
    I.click('Next');
    I.say('Please handle captcha');
    pause();
    
    I.click('Next');
    I.see('Enter a password');
}).tag('@gmail');

Scenario('invalid email and password',  async ({ I }) => {
    I.fillField('Email or phone', 'jipdosfh8eugruykqgk,jgK!');
    I.click('Next');
    I.see('Enter a valid email or phone number');
    I.fillField('Email or phone', email);
    I.click('Next');
    
    I.fillField('Enter your password', 'hgp9r8y3289yeuigdvbajkuo@Gibkljda');
    I.click('Next');
    I.see('Wrong password. Try again or click Forgot password to reset it.');
}).tag('@gmail');

Scenario('complete register',  async ({ I }) => {
    I.fillField('Email or phone', email);
    I.click('Next');
    
    I.fillField('Enter your password', secret(password));
    I.click('Next');
    I.say('Please handle captcha');
    pause();
}).tag('@gmail');