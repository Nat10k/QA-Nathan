import * as dotenv from 'dotenv';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const firstName = process.env.FACEBOOK_FIRST_NAME;
const password = process.env.FACEBOOK_PASSWORD;
const baseURL = "https://id-id.facebook.com"

Feature('login');

const waitTime = 2;

Before(({ I }) => {
    I.amOnPage(baseURL);
})

Scenario('empty fields', async ({ I }) => {
    I.click('Masuk');
    I.wait(waitTime);
    I.see('Kredensial Salah');
    I.fillField('email', email);
    I.click('Masuk');
    I.wait(waitTime);
    I.see('Kredensial Salah');
    I.clearField('email');
    I.fillField('pass', password);
    I.click('Masuk');
    I.wait(waitTime);
    I.see('Kredensial Salah');
});

Scenario('wrong credentials', async ({ I }) => { // Facebook doesn't handle spaces in email
    I.fillField('email', 'lolololololol@gmail.com');
    I.fillField('pass', password);
    I.click('Masuk');
    I.wait(waitTime);
    I.see('Kredensial Salah');

    I.fillField('email', email);
    I.fillField('pass', 'iohvubahidbiuwgeiyg781y2471');
    I.click('Masuk');
    I.wait(waitTime);
    I.see('Kredensial Salah');
});

Scenario('complete login',  async ({ I }) => {
    I.fillField('email', email);
    I.fillField('pass', password);
    I.click('Masuk');
    I.wait(waitTime);
    I.see(firstName);
});