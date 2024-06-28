import * as dotenv from 'dotenv';

dotenv.config({path:'./twitter_test/.env'});
const email = process.env.TWITTER_EMAIL;
const password = process.env.TWITTER_PASSWORD;
const baseURL = "https://x.com/?lang=en"

Feature('login');

const waitTime = 10;

Before(({ I }) => {
    I.amOnPage(baseURL);
})

Scenario('wrong credentials', async ({ I }) => {
    // Wrong email
    I.click('Sign in');
    I.click('Next');
    I.see('Sorry, we could not find your account.');
    I.fillField('Phone, email, or username', 'lolololololol@gmail.com');
    I.click('Next');
    I.see('Sorry, we could not find your account.');

    // Wrong password
    I.fillField('Phone, email, or username', email);
    I.fillField('password', 'blidaiubwehbsa');
    I.click('Log in');
    I.waitForText('Wrong password', waitTime);
});

Scenario('complete login',  async ({ I }) => {
    I.click('Sign in');
    I.fillField('Phone, email, or username', email);
    I.click('Next');
    I.fillField('password', password);
    I.click('Log in');
    I.waitForText('What is happening?!',waitTime);
});