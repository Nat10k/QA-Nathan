import * as dotenv from 'dotenv';

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
    I.fillField('pass', password);
    I.click('Masuk');
    I.wait(waitTime);
});

Scenario.only('like self post', async ({ I }) => {
    I.click('Beranda');
    // Like top self post
    I.click('Suka');
    // Like all self post
    I.executeScript(() => document.querySelectorAll('[aria-label="Suka"]').forEach(e => {
        if (e instanceof HTMLElement) {
            e.click();
        }
    }));
});

