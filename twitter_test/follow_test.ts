import * as dotenv from 'dotenv';

dotenv.config({path:'./twitter_test/.env'});
const email = process.env.TWITTER_EMAIL;
const password = process.env.TWITTER_PASSWORD;
const friend = process.env.TWITTER_FRIEND_ID;
const baseURL = "https://x.com/?lang=en"

Feature('follow');

const waitTime = 10;

Before(({ I }) => {
    I.amOnPage(baseURL);
    I.click('Sign in');
    I.fillField('Phone, email, or username', email);
    I.click('Next');
    I.fillField('password', password);
    I.click('Log in');
    I.waitForText('What is happening?!',waitTime);
})

Scenario('Follow random person', async ({ I }) => {
    I.scrollPageToBottom();
    I.see('Who to follow');
    I.click('Follow');
    I.see('Following')
});

Scenario('search friend to follow',  async ({ I }) => {
    I.click('Explore');
    I.fillField('Search', friend);
    I.click('Follow');
    I.see('Following');
});