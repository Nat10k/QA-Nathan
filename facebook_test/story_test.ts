import { makeFakeAvatar } from '../data-faker';

Feature('story');

const waitTime = 10;

Before(({ login }) => {
    login('facebook');
})

Scenario('basic text story', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    I.click(locate('a').withDescendant(locate('div').withText('Buat cerita')));
    I.click(locate('div').withClassAttr('x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1bhdf0j'));
    I.fillField(locate({xpath:'//textarea'}), 'This is an edited text story');
    I.click(locate('div').inside(locate('div').withAttr({'aria-label':'Bagikan ke Cerita'})));
    I.wait(waitTime);
    I.see('Cerita Anda');
});

Scenario('edited text story', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    I.click(locate('a').withDescendant(locate('div').withText('Buat cerita')));
    I.click(locate('div').withClassAttr('x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1bhdf0j'));
    I.fillField(locate({xpath:'//textarea'}), 'This is an edited text story');
    I.click(locate('div').withAttr({'role':'combobox'}));
    I.click(locate('div').withAttr({'role':'button'}).withDescendant(locate('div').withDescendant(locate('span').withDescendant('div').withText('kasual'))));
    I.click(locate('div').inside(locate('div').withAttr({'aria-label':'Bagikan ke Cerita'})));
    I.click(locate('div').withAttr({'aria-pressed':'false', 'aria-label':'Ilustrasi merah, gambar latar belakang'}));
    I.wait(waitTime);
    I.see('Cerita Anda');
});

Scenario('photo story', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    I.click(locate('a').withDescendant(locate('div').withText('Buat cerita')));
    await makeFakeAvatar('test_story.jpg');
    I.attachFile(locate('input').withAttr({'type':'file', 'class':'x1s85apg', 'accept':'image/*,image/heif,image/heic'}), 'test_story.jpg');
    I.click(locate('div').inside(locate('div').withAttr({'aria-label':'Bagikan ke Cerita'})));
    I.wait(waitTime);
    I.see('Cerita Anda');
});

Scenario('cancel making story', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    I.click(locate('a').withDescendant(locate('div').withText('Buat cerita')));
    I.click(locate('div').withClassAttr('x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1bhdf0j'));
    I.click(locate('div').withAttr({'aria-label':'Hapus'}));
    I.click(locate('div').withAttr({'aria-label':'Hapus'}).inside(locate('div').withClassAttr('html-div xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x78zum5 xdt5ytf x1iyjqo2 x1jxyteu x1yr2tfi x1n2onr6 x1mfppf3')));
    I.click(locate('div').withAttr({'aria-label':'Tutup'}).inside(locate('div').withAttr({role:'banner'})));
    I.wait(3);
    I.see('Buat cerita');
});

Scenario('view self story', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    I.wait(waitTime);
    I.click(locate('a').withAttr({'aria-label':'Lihat cerita Anda'}));
    I.click(locate('div').withAttr({'aria-label':'Kartu selanjutnya'}));
    I.click(locate('div').withAttr({'aria-label':'Kartu sebelumnya'}));
    I.click(locate('div').withAttr({'aria-label':'Tutup'}), 'div[role="banner"]');
    I.see('Apa yang Anda pikirkan');
});