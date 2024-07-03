import * as dotenv from 'dotenv';
import { makeFakeAvatar, makeFakeTextFile } from '../data-faker';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const password = process.env.FACEBOOK_PASSWORD;
const baseURL = "https://id-id.facebook.com"

Feature('post');

const waitTime = 10;

Before(({ I }) => {
    // Login
    I.amOnPage(baseURL);
    I.fillField('email', email);
    I.fillField('pass', secret(password));
    I.click('Masuk');
    I.wait(waitTime);
})

Scenario('post text', async ({ I }) => { // Facebook doesn't handle spaces in email
    I.click('Buat');
    I.click(locate('div').withAttr({'role':'button'}).withDescendant(locate('span').withText('Posting'))); // Posting button
    I.fillField(locate('div').withAttr({'role':'textbox'}),'test'); // Post textbox
    I.see('test');
    I.click('Kirim');
    I.wait(waitTime);
    I.click('Beranda');
    I.wait(waitTime);
    I.see('test');
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
    I.wait(waitTime);
    I.click('Beranda');
    I.wait(waitTime);
    I.see('test photo');
});

Scenario('upload non-image file on photo post', async ({ I }) => { // Facebook doesn't handle spaces in email
    I.click('Buat');
    I.click(locate('div').withAttr({'role':'button'}).withDescendant(locate('span').withText('Posting'))); // Posting button
    I.fillField(locate('div').withAttr({'role':'textbox'}),'test photo'); // Post textbox
    I.see('test photo');
    await makeFakeTextFile('fakeText.txt');
    I.click('Foto/video');
    I.attachFile('form input[type="file"]', 'fakeText.txt'); // File is uploaded but no picture is shown
    I.click('Kirim');
    I.wait(waitTime);
    I.click('Beranda');
    I.wait(waitTime);
    I.see('test photo');
});