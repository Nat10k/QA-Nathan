import * as dotenv from 'dotenv';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const password = process.env.FACEBOOK_PASSWORD;
const baseURL = "https://id-id.facebook.com"

Feature('story');

const waitTime = 5;

Before(({ I }) => {
    // Login
    I.amOnPage(baseURL);
    I.fillField('email', email);
    I.fillField('pass', password);
    I.click('Masuk');
    I.wait(waitTime);
});

Scenario('comment on one post', async ({ I }) => {
    I.click('Beranda');
    // Comment on first found post
    I.click('Komentari');
    I.fillField('Tulis komentar...', 'hellow world');
    I.click('Komentari');
});

Scenario('100.000 words comment', async ({ I }) => {
    I.click('Beranda');
    I.fillField('Tulis komentar...', process.env.LONG_COMMENT); // Facebook has character limit although not shown
    I.click('Komentari');
});