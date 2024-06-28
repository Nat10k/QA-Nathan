import * as dotenv from 'dotenv';

dotenv.config({path:'./twitter_test/.env'});
const email = process.env.TWITTER_EMAIL;
const name = process.env.TWITTER_NAME;
const password = process.env.TWITTER_PASSWORD;
const baseURL = "https://x.com/?lang=en"

const waitTime = 20;

Feature('register');

Before(({ I }) => {
    I.amOnPage(baseURL);
    I.see('Happening now');
    I.click(locate({css:'[data-testid="signupButton"]'}));
    I.waitForText('Create your account', waitTime);
});

Scenario('invalid email', async ({ I }) => { // Facebook doesn't handle spaces in email
    // Fill other fields first
    I.fillField('Name', name);
    I.selectOption('Month', 'February');
    I.selectOption('Day', '28');
    I.selectOption('Year', '2002');

    // Invalid email format
    I.fillField('Email', 'test 123');
    I.see('Please enter a valid email.');
    I.fillField('Email', 'test 123@g.com');
    I.see('Please enter a valid email.');

    // Non-existent email
    I.fillField('Email', 'test123@981try.com');
    I.click('Next');
});

Scenario.only('invalid password',  async ({ I }) => {
    I.fillField('Name', name);
    I.fillField('Email', email);
    I.selectOption('Month', 'February');
    I.selectOption('Day', '28');
    I.selectOption('Year', '2002');
    I.click('Next');
    I.wait(5);
    I.click({css:'[data-theme="home.verifyButton"]'});
    I.wait(180); // Wait until verification is done
    I.fillField('Password', 'ab');
});

Scenario('complete register',  async ({ I }) => {
    I.fillField('Name', name);
    I.fillField('Email', email);
    I.selectOption('Month', 'February');
    I.selectOption('Day', '28');
    I.selectOption('Year', '2002');
    I.click('Next');
    I.wait(5);
    I.click({css:'[data-theme="home.verifyButton"]'});
    I.wait(180); // Wait until verification is done
    I.fillField('Password', password);
});