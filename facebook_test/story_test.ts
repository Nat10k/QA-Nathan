import * as dotenv from 'dotenv';
import { makeFakeAvatar } from '../data-faker';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const password = process.env.FACEBOOK_PASSWORD;
const baseURL = "https://id-id.facebook.com"

Feature('story');

const waitTime = 5;

Before(({ I }) => {
    // Login
    I.amOnPage(baseURL);
    I.fillField('email', email);
    I.fillField('pass', password);
    I.click('Masuk');
    I.wait(waitTime);
});

Scenario('basic text story', async ({ I }) => {
    I.click('Beranda');
    I.click('Buat cerita');
    I.click(locate('div').withClassAttr('x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1bhdf0j'));
    I.fillField('textarea', 'hellow world !');
    I.click('Bagikan ke Cerita');
    I.wait(waitTime);
    I.see('Cerita Anda');
});

Scenario('edited text story', async ({ I }) => {
    I.click('Beranda');
    I.click('Buat cerita');
    I.click(locate('div').withClassAttr('x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1bhdf0j'));
    I.fillField('textarea', 'This is an edited text story');
    I.click(locate('div').withAttr({'role':'combobox'}));
    I.click(locate('div').withAttr({'role':'button'}).withDescendant(locate('div').withDescendant(locate('span').withDescendant('div').withText('kasual'))));
    I.click('Bagikan ke Cerita');
    I.click(locate('div').withAttr({'aria-pressed':'false', 'aria-label':'Ilustrasi merah, gambar latar belakang'}));
    I.wait(waitTime);
    I.see('Cerita Anda');
});

Scenario('photo story', async ({ I }) => {
    I.click('Beranda');
    I.click('Buat cerita');
    await makeFakeAvatar('test_story.jpg');
    I.attachFile(locate('input').withAttr({'type':'file', 'class':'x1s85apg', 'accept':'image/*,image/heif,image/heic'}), 'test_story.jpg');
    I.click('Bagikan ke Cerita');
    I.wait(waitTime);
    I.see('Cerita Anda');
});

Scenario.only('cancel making story', async ({ I }) => {
    I.click('Beranda');
    I.click('Buat cerita');
    I.click(locate('div').withClassAttr('x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1bhdf0j'));
    I.click('Tutup', 'div[role="banner"]');
    I.click('Hapus', 'div[role="dialog"]');
    I.see('Buat cerita');
});