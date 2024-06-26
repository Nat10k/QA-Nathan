import * as dotenv from 'dotenv';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const password = process.env.FACEBOOK_PASSWORD;
const baseURL = "https://id-id.facebook.com"

Feature('group');

const waitTime = 15;

Before(({ I }) => {
    // Login
    I.amOnPage(baseURL);
    I.fillField('email', email);
    I.fillField('pass', password);
    I.click('Masuk');
    I.wait(waitTime);
});

Scenario('make new group', async ({ I }) => {
    I.click('Beranda');
    I.click(locate('a').withAttr({'aria-label':'Grup'}));
    I.click('Buat Grup Baru');
    I.fillField('Nama Grup', 'Test group');
    I.click('Pilih privasi');
    I.click(locate('div').withAttr({'role':'option'}).
        withDescendant(locate('div').withDescendant('div').withDescendant('div').withDescendant('span').withText('Privat')));
    // Try cellular preview
    I.click('Beralih ke tata letak seluler');
    I.see('Pratinjau Seluler');
    // Back to desktop preview
    I.click('Beralih ke tata letak desktop');
    I.see('Pratinjau Desktop');
    const buatButtons = await I.getAllElements('Buat');
    await buatButtons[1].click();
    pause();
});

