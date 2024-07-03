import * as dotenv from 'dotenv';
import { makeFakeAvatar } from '../data-faker';

dotenv.config({path:'./facebook_test/.env'});
const groupName = process.env.FACEBOOK_GROUP_NAME;

Feature('group');

const waitTime = 10;

Before(({ I }) => {
    login('facebook');
})

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

Scenario('post text in group', async ({ I }) => {
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
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Suka'}).inside(locate('div').withAttr({'data-visualcompletion':'ignore-dynamic'})).first());
    I.seeElement(locate('div').withAttr({role:'button', 'aria-label':'Hapus Suka'}).inside(locate('div').withAttr({'data-visualcompletion':'ignore-dynamic'})));
});

Scenario('anonymous photo post in group', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Grup'}));
    I.click(locate('a').inside(locate('div').withAttr({'aria-label':'Daftar Grup'})).withAttr({ role:'link'}).withText(groupName));
    I.wait(waitTime);
    I.see('Beranda komunitas');

    // Anonymous photo post
    I.click(locate('div').withAttr({role:'button'}).withDescendant(locate('span').withTextEquals('Postingan Anonim')));
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Buat Postingan Anonim'}).inside(locate('div').withAttr({role:'dialog'})));
    I.type('Anonymous test');
    await makeFakeAvatar('fakeAvatar.jpg');
    I.attachFile(locate('input').withAttr({type:'file'}).inside(locate('div').withAttr({role:'dialog'})), 'fakeAvatar.jpg');
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Kirim'}).inside(locate('div').withAttr({role:'dialog'})));
    I.wait(waitTime);
    I.see('Anggota anonim');
    I.see('Anonymous test');
    // Like the post
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Suka'}).inside(locate('div').withAttr({'data-visualcompletion':'ignore-dynamic'})).first());
    I.seeElement(locate('div').withAttr({role:'button', 'aria-label':'Hapus Suka'}).inside(locate('div').withAttr({'data-visualcompletion':'ignore-dynamic'})));
});

Scenario('invite friend', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Grup'}));
    I.click(locate('a').inside(locate('div').withAttr({'aria-label':'Daftar Grup'})).withAttr({ role:'link'}).withText(groupName));
    I.wait(waitTime);
    I.see('Beranda komunitas');

    I.click(locate('div').withAttr({role:'button', 'aria-label':'Undang'}));
    I.click(locate('div').withAttr({role:'menuitem'}).withDescendant(locate('span').withTextEquals('Undang teman Facebook')));
    I.fillField(locate('input').withAttr({'aria-label':'Cari teman berdasarkan nama'}), 'No');
    I.wait(2);
    I.click(locate('div').withAttr({role:'checkbox'}).first());
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Kirim Undangan'}));
    I.wait(2);
    I.see('Beranda komunitas');
});