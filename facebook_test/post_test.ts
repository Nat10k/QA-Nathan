import * as dotenv from 'dotenv';
import { makeFakeAvatar } from '../data-faker';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const firstName = process.env.FACEBOOK_FIRST_NAME;
const lastName = process.env.FACEBOOK_LAST_NAME;
const password = process.env.FACEBOOK_PASSWORD;
const baseURL = "https://id-id.facebook.com"

Feature('post');

const waitTime = 10;

Before(({ I }) => {
    // Login
    I.amOnPage(baseURL);
    I.fillField('email', email);
    I.fillField('pass', password);
    I.click('Masuk');
    I.wait(waitTime);
})

Scenario('add/edit profile photo', async ({ I }) => {
    I.click('Profil Anda');
    I.click(firstName + " " + lastName);
    I.click('Tindakan foto profil');
    I.click(locate('div').withAttr({'role':'menuitem'}).withText('Pilih foto profil'));
    // Upload image
    await makeFakeAvatar('testAvatar.jpg');
    I.attachFile('div[role="dialog"] input[type="file"]', 'testAvatar.jpg');
    I.click('Simpan');
});

Scenario('add/edit cover photo', async ({ I }) => {
    I.click('Profil Anda');
    I.click(firstName + " " + lastName);
    // Upload image
    await makeFakeAvatar('testAvatar.jpg');
    I.attachFile('input[type="file"]', 'testAvatar.jpg');
    I.wait(10);
    I.click({css:'div.__fb-dark-mode.x1afcbsf.x1uhb9sk.x1swf91x.x78zum5.xsag5q8.x1pi30zi.x1swvt13.xz9dl7a div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1iyjqo2.xs83m0k.x150jy0e.x1e558r4.xjkvuk6.x1iorvi4.xdl72j9'});
});

Scenario('post text', async ({ I }) => { // Facebook doesn't handle spaces in email
    I.click('Buat');
    I.click(locate('div').withAttr({'role':'button'}).withDescendant(locate('span').withText('Posting'))); // Posting button
    I.fillField(locate('div').withAttr({'role':'textbox'}),'test'); // Post textbox
    I.see('test');
    I.click('Kirim');
});

Scenario('post text and photo', async ({ I }) => { // Facebook doesn't handle spaces in email
    I.click('Buat');
    I.click(locate('div').withAttr({'role':'button'}).withDescendant(locate('span').withText('Posting'))); // Posting button
    I.fillField(locate('div').withAttr({'role':'textbox'}),'test photo'); // Post textbox
    I.see('test photo');
    await makeFakeAvatar('testAvatar.jpg');
    I.click('Foto/video');
    I.attachFile('form input[type="file"]', 'testAvatar.jpg');
    I.click('Kirim');
});

Scenario.only('like self post', async ({ I }) => { // Facebook doesn't handle spaces in email
    I.click('Beranda');
    // Like topmost post
    I.click('Suka');
});