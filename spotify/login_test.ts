import * as dotenv from 'dotenv';

dotenv.config({path:'./spotify/.env'});
const username = process.env.SPOTIFY_EMAIL;
const password = process.env.SPOTIFY_PASSWORD;

// Base URL : https://open.spotify.com/
Feature('login');

const waitTime = 10;

Before(({ I }) => {
    I.openLogIn();
})

Scenario('wrong email', async ({ I }) => {
    // Search based on id
    I.fillField('#login-username', '');
    I.click('Masuk');
    I.see('salah');

    I.fillField('#login-username', 'test123@981try.com');
    I.click('Masuk');
    I.see('salah');
});

Scenario('wrong password', async ({ I }) => {
    // Search based on id
    I.fillField('#login-username', username);

    I.fillField('#login-password', '');
    I.click('Masuk');
    I.see('salah');

    I.fillField('#login-password', 'blelelelel123');
    I.click('Masuk');
    I.see('salah');
});

Scenario('complete login', async ({ I }) => {
    // Search based on id
    I.fillField('#login-username', username);
    I.fillField('#login-password', password);
    I.click('Masuk');
    I.wait(waitTime);
    I.dontSee('Masuk');
});