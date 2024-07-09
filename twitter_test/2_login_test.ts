import * as dotenv from 'dotenv';

dotenv.config({path:'./twitter_test/.env'});
const email = process.env.TWITTER_EMAIL;
const password = process.env.TWITTER_PASSWORD;
const baseURL = "https://x.com/?lang=en"

Feature('login twitter').tag('@twitter');

const waitTime = 10;

Before(({ I }) => {
    I.amOnPage(baseURL);
    I.scrollPageToBottom();
});

Scenario('wrong credentials', async ({ I }) => {
    // Wrong email
    I.click('Sign in');
    I.click('Next');
    I.see('Sorry, we could not find your account.');
    I.fillField('Phone, email, or username', 'lolololololo756478961732681726387l@gmail.com');
    I.click('Next');
    I.see('Sorry, we could not find your account.');

    // Wrong password
    I.fillField('Phone, email, or username', email);
    I.click('Next');
    I.wait(3);
    const passwordFieldCount = await I.grabNumberOfVisibleElements('password');
    if (passwordFieldCount < 1) {
        pause(); // Verify account
    }
    I.fillField('password', 'blidaiubwehbsa');
    I.click('Log in');
    I.waitForText('Wrong password', waitTime);
});

Scenario('complete login',  async ({ I }) => {
    I.click('Sign in');
    I.fillField('Phone, email, or username', email);
    I.click('Next');
    const passwordFieldCount = await I.grabNumberOfVisibleElements('password');
    if (passwordFieldCount < 1) {
        pause(); // Verify account
    }
    I.fillField('password', secret(password));
    I.wait(2);
    I.click('Log in');
    I.wait(1);
    I.waitForText('What is happening?!',waitTime);
});