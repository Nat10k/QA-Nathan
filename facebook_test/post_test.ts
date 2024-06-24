import * as dotenv from 'dotenv';
import { makeFakeAvatar } from '../data-faker';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const firstName = process.env.FACEBOOK_FIRST_NAME;
const lastName = process.env.FACEBOOK_LAST_NAME;
const password = process.env.FACEBOOK_PASSWORD;
const baseURL = "https://id-id.facebook.com"

Feature('post');

const waitTime = 5;

Before(({ I }) => {
    I.amOnPage(baseURL);
    I.fillField('email', email);
    I.fillField('pass', password);
    I.click('Masuk');
    I.wait(waitTime);
})

Scenario.only('add profile photo', async ({ I }) => {
    I.click('Profil Anda');
    I.click(firstName + " " + lastName);
    I.click('Tindakan foto profil');
    I.click('Pilih foto profil');
    // Upload image
    await makeFakeAvatar('testAvatar.jpg');
    I.attachFile({css:'input[type="file"]'}, 'testAvatar.jpg');
    pause();
});

// Scenario('wrong credentials', async ({ I }) => { // Facebook doesn't handle spaces in email
//     I.fillField('email', 'lolololololol@gmail.com');
//     I.fillField('pass', password);
//     I.click('Masuk');
//     I.wait(waitTime);
//     I.see('Kredensial Salah');

//     I.fillField('email', email);
//     I.fillField('pass', 'iohvubahidbiuwgeiyg781y2471');
//     I.click('Masuk');
//     I.wait(waitTime);
//     I.see('Kredensial Salah');
// });