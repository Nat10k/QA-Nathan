import * as dotenv from 'dotenv';
import { makeFakeAvatar } from '../data-faker';

dotenv.config({path:'./facebook_test/.env'});
const firstName = process.env.FACEBOOK_FIRST_NAME;
const lastName = process.env.FACEBOOK_LAST_NAME;

Feature('profile');

Before(({ login }) => {
    login('facebook');
})

Scenario('add/edit profile photo', async ({ I }) => {
    I.click(locate('div').withAttr({'aria-label':'Profil Anda'}));
    I.click(firstName + " " + lastName);
    I.click('Tindakan foto profil');
    I.click(locate('div').withAttr({'role':'menuitem'}).withText('Pilih foto profil'));
    // Upload image
    await makeFakeAvatar('testAvatar.jpg');
    I.attachFile('div[role="dialog"] input[type="file"]', 'testAvatar.jpg');
    I.click('Simpan');
});

Scenario('add/edit cover photo', async ({ I }) => {
    I.click(locate('div').withAttr({'aria-label':'Profil Anda'}));
    I.click(firstName + " " + lastName);
    // Upload image
    await makeFakeAvatar('testAvatar.jpg');
    I.attachFile('input[type="file"]', 'testAvatar.jpg');
    I.wait(2); // wait for image to upload
    I.click(locate('div').withClassAttr("x1n2onr6 x1ja2u2z x78zum5 x2lah0s xl56j7k x6s0dn4 xozqiw3 x1q0g3np xi112ho x17zwfj4 x585lrc x1403ito x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xbxaen2 x1u72gb5 xtvsq51 x1r1pt67"));
});