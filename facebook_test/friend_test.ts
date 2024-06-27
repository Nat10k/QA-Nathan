import * as dotenv from 'dotenv';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const password = process.env.FACEBOOK_PASSWORD;
const friendProfile = process.env.FACEBOOK_FRIEND_PROFILE;
const baseURL = "https://id-id.facebook.com"

Feature('friend');

const waitTime = 5;

Before(({ I }) => {
    // Login
    I.amOnPage(baseURL);
    I.fillField('email', email);
    I.fillField('pass', password);
    I.click('Masuk');
    I.wait(waitTime);
});

Scenario('add friend', async ({ I }) => {
    I.amOnPage(friendProfile);
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Tambahkan teman'}));
    I.wait(1);
    I.see('Batalkan permintaan');
});