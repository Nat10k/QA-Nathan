import * as dotenv from 'dotenv';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const password = process.env.FACEBOOK_PASSWORD;
const baseURL = "https://id-id.facebook.com"

Feature('game');

const waitTime = 10;

Before(({ I }) => {
    // Login
    I.amOnPage(baseURL);
    I.fillField('email', email);
    I.fillField('pass', secret(password));
    I.click('Masuk');
    I.wait(waitTime);
});

Scenario('open a game (cooking center)', async ({ I }) => {
    I.amOnPage('https://www.facebook.com/gaming/play/?store_visit_source=games_bookmark');
    I.click('Mainkan Game');
    I.click('Cooking Center');
    I.wait(10);
    I.see('SEDANG BERMAIN');
});