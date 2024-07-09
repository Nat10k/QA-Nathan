import * as dotenv from 'dotenv';
import { makeFakeAvatar } from '../data-faker';

dotenv.config({path:'./facebook_test/.env'});
const friendProfile = process.env.FACEBOOK_FRIEND_PROFILE;
const selfProfile = process.env.FACEBOOK_SELF_PROFILE;

Feature('friend');

Scenario('add friend', async ({ I }) => {
    const loginBtn = await I.grabNumberOfVisibleElements(locate('button').withAttr({'data-testid':'royal_login_button'}));
    if (loginBtn < 1) {
        I.logoutFacebook();
    }
    I.loginFriendFacebook();
    I.amOnPage(selfProfile);
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Tambahkan teman'}));
}).tag('@facebook');

Scenario('accept friend', async ({ I }) => {
    I.logoutFacebook();
    I.loginFacebook();
    I.amOnPage(friendProfile);
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Tanggapi'}));
    I.click(locate('div').withAttr({role:'menuitem'}).first());
    I.waitForText('Teman', 5);
}).tag('@facebook');

Scenario('chat', async ({ I }) => {
    I.amOnPage(friendProfile);
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Kirim pesan'}));
    I.wait(5);

    // Send text message
    I.type('Halo');
    I.pressKey('Enter');
    I.wait(2);
    I.see('Halo');

    // Send like
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Kirim Like'}));
    I.wait(2);
    I.see('Terkirim');
    
    // Send sticker
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Pilih Stiker'}));
    I.click(locate('div').withAttr({role:'button'}).withDescendant(locate('span').withTextEquals('Senang').inside({css:'[role="dialog"]'})));
    I.click(locate('div').withAttr({role:'button'}).inside({css:'[role="listitem"]'}).first());
    I.wait(2);
    I.see('Terkirim');

    // Send voice
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Kirim klip suara'}));
    I.wait(10);
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Tekan Enter untuk mengirim'}));
    I.waitForText('Terkirim', 20);

    // Send photo
    await makeFakeAvatar('fakeAvatar.jpg');
    I.attachFile(locate('input').withAttr({type:'file'}).inside(locate('div').withClassAttr('html-div xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xpqajaz x9f619 x78zum5 x1iyjqo2 xs83m0k x1n2onr6 xh8yej3 x1e558r4 x150jy0e xz9dl7a xsag5q8')), 'fakeAvatar.jpg');
    I.wait(2);
    I.pressKey('Enter');
    I.see('Terkirim');

    // Close chat
    I.click(locate('div').withAttr({'aria-label':'Tutup obrolan'}));
}).tag('@facebook');

Scenario('unfriend', async ({ I }) => {
    I.amOnPage(friendProfile);
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Teman'}));
    I.wait(2);
    I.click(locate('div').withAttr({role:'menuitem'}).withDescendant(locate('span').withText('Hapus pertemanan')));
    I.click(locate('div').withAttr({role:'button', 'aria-label':'Konfirmasi'}));
}).tag('@facebook');