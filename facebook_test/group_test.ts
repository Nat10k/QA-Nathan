import * as dotenv from 'dotenv';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const password = process.env.FACEBOOK_PASSWORD;
const groupName = process.env.FACEBOOK_GROUP_NAME;
const baseURL = "https://id-id.facebook.com"

Feature('group');

const waitTime = 10;

Before(({ I }) => {
    // Login
    I.amOnPage(baseURL);
    I.fillField('email', email);
    I.fillField('pass', password);
    I.click('Masuk');
    I.wait(waitTime);
});

Scenario('make new group', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Grup'}));
    I.click('Buat Grup Baru');
    I.fillField('Nama Grup', groupName);
    I.click('Pilih privasi');
    I.click(locate('div').withAttr({'role':'option'}).
        withDescendant(locate('div').withDescendant('div').withDescendant('div').withDescendant('span').withText('Privat')));
    // Try cellular preview
    I.click('Beralih ke tata letak seluler', locate('div').withAttr({'aria-label':'Perangkat'}));
    I.see('Pratinjau Seluler');
    // Back to desktop preview
    I.click('Beralih ke tata letak desktop', locate('div').withAttr({'aria-label':'Perangkat'}));
    I.see('Pratinjau Desktop');
    I.click(locate('[role="button"]').withClassAttr('x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x1ypdohk xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x87ps6o x1lku1pv x1a2a7pz x9f619 x3nfvp2 xdt5ytf xl56j7k x1n2onr6 xh8yej3')
                    .withAttr({'aria-label':'Buat'}));
    I.wait(waitTime);
    I.see('Beranda komunitas');
});

Scenario('open group', ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Grup'}));
    I.click(locate('a').inside(locate('div').withAttr({'aria-label':'Daftar Grup'})).withAttr({ role:'link'}).withText(groupName));
    I.wait(waitTime);
    I.see('Beranda komunitas');
});

Scenario.only('post in group', ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Grup'}));
    I.click(locate('a').inside(locate('div').withAttr({'aria-label':'Daftar Grup'})).withAttr({ role:'link'}).withText(groupName));
    I.wait(waitTime);
    I.see('Beranda komunitas');

    // Normal text post
    I.click(locate('div').withAttr({role:'button'}).withDescendant(locate('span').withText('Tulis sesuatu...')));
    I.type('Post test');
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Posting'}));
    I.wait(waitTime);
    I.see('Post test');
    // Like the post
    I.click('Suka', locate('div').withClassAttr('x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x193iq5w xeuugli x1r8uery x1iyjqo2 xs83m0k xg83lxy x1h0ha7o x10b6aqq x1yrsyyn').inside({css:'[role=feed]'}).last());
    pause();
});