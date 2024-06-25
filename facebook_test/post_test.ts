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
    I.wait(2); // wait for image to upload
    I.click(locate('div').withClassAttr("x1n2onr6 x1ja2u2z x78zum5 x2lah0s xl56j7k x6s0dn4 xozqiw3 x1q0g3np xi112ho x17zwfj4 x585lrc x1403ito x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xbxaen2 x1u72gb5 xtvsq51 x1r1pt67"));
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

Scenario('like self post', async ({ I }) => { // Facebook doesn't handle spaces in email
    I.click('Beranda');
    // Like topmost post
    I.click('Suka');
});