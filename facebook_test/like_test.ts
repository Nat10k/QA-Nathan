import * as dotenv from 'dotenv';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const password = process.env.FACEBOOK_PASSWORD;
const baseURL = "https://id-id.facebook.com"

Feature('like');

const waitTime = 5;

Before(({ I }) => {
    // Login
    I.amOnPage(baseURL);
    I.fillField('email', email);
    I.fillField('pass', password);
    I.click('Masuk');
    I.wait(waitTime);
});

Scenario('like self post', async ({ I }) => {
    I.click('Beranda');
    // Like top post in home page
    I.click('Suka');
    // Like all post in home page
    I.executeScript(() => document.querySelectorAll('[aria-label="Suka"]').forEach(e => {
        if (e instanceof HTMLElement) {
            e.click();
        }
    }));
});

