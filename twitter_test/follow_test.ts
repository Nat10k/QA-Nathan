import * as dotenv from 'dotenv';

dotenv.config({path:'./twitter_test/.env'});
const email = process.env.TWITTER_EMAIL;
const password = process.env.TWITTER_PASSWORD;
const friend = process.env.TWITTER_FRIEND_ID;
const baseURL = "https://x.com/?lang=en"

Feature('follow');

Before(({ login }) => {
    login('user');
});

Scenario('Follow random person', async ({ I }) => {
    I.scrollPageToBottom();
    I.see('Who to follow');
    I.click('Follow');
    I.see('Following');
    // Unfollow
    I.click('Following');
    pause();
});

Scenario('search friend to follow',  async ({ I }) => {
    I.click({css : '[data-testid="AppTabBar_Explore_Link"'});
    I.fillField('Search', friend);
    I.click('Search for');
    I.click('Follow');
    I.see('Following');
});