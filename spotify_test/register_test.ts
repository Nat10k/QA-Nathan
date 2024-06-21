import * as dotenv from 'dotenv';

dotenv.config({path:'./spotify_test/.env'});
const username = process.env.SPOTIFY_EMAIL;
const password = process.env.SPOTIFY_PASSWORD;

// Base URL : https://open.spotify.com/
Feature('register');

const waitTime = 10;

Before(({ I }) => {
    I.openSignUp();
})

Scenario('invalid email', async ({ I }) => {
    // Search based on id
    I.fillField('#username', '');
    // Search based on class
    I.click('.ButtonInner-sc-14ud5tc-0');
    I.see('This email is invalid');
    // Invalid email format
    I.fillField('#username', 'test 123');
    I.click('.ButtonInner-sc-14ud5tc-0');
    I.see('This email is invalid');

    I.fillField('#username', 'test 123@gmail.com');
    I.click('.ButtonInner-sc-14ud5tc-0');
    I.see('This email is invalid');

    I.fillField('#username', 'test123@981try.com');
    I.click('.ButtonInner-sc-14ud5tc-0');
    I.see('Invalid email address');
});

Scenario('invalid password',  async ({ I }) => {
    I.fillField('#username', username);
    I.waitForValue('#username', username, 5);
    I.click('.ButtonInner-sc-14ud5tc-0');
    I.wait(waitTime);
    I.see('Create a password');
    // Search field by label
    I.fillField('Password', 'ab'); // < 10 char
    I.click('Next');
    I.see('Create a password'); // Still on page
    I.fillField('Password', 'abcdefghijk'); // no number
    I.click('Next');
    I.see('Create a password'); // Still on page
    I.fillField('Password', '1234567890'); // no letter
    I.click('Next');
    I.see('Create a password'); // Still on page
});

Scenario('complete signup',  async ({ I }) => {
    I.fillField('#username', username);
    I.waitForValue('#username', username, 5);
    I.click('Next');
    I.wait(waitTime);
    I.see('Create a password');
    I.fillField('Password', password);
    I.waitForValue('#new-password', password, 5);
    I.click('Next');
    I.wait(waitTime);
    I.fillField('Name', 'Nathan');
    I.waitForValue('#displayName', 'Nathan', 5);
    I.pressKey('Enter');
    I.see('Please enter your date of birth.');
    I.fillField('dd','28');
    I.selectOption('month','February');
    I.fillField('year', 2001);
    I.pressKey('Enter');
    I.dontSee('Please enter your date of birth.');
    I.checkOption('Man');
    I.wait(2);
    I.click('Next');
    I.wait(waitTime);
    I.click('Sign up');
});