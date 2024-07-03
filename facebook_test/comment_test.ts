import * as dotenv from 'dotenv';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const password = process.env.FACEBOOK_PASSWORD;
const baseURL = "https://id-id.facebook.com"

Feature('comment');

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
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    // Comment on first found post
    I.click(locate('div').withAttr({'aria-label':'Beri komentar'}).first());
    I.fillField(locate('div').withAttr({'aria-label':'Tulis komentar...', role:'textbox'}), 'hellow world');
    I.click('Komentari');
});

Scenario('100.000 words comment', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    I.fillField(locate('div').withAttr({'aria-label':'Tulis komentar...', role:'textbox'}), process.env.LONG_COMMENT); // Facebook has character limit although not shown
    I.click('Komentari');
});