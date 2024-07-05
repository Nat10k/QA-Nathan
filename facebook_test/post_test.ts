import { makeFakeAvatar, makeFakeTextFile } from '../data-faker';

Feature('post');

const waitTime = 10;

Before(({ login }) => {
    login('facebook');
});

Scenario('post text', async ({ I }) => { // Facebook doesn't handle spaces in email
    I.click(locate('div').withAttr({'aria-label':'Buat', role:'button'}));
    I.click(locate('div').withAttr({'role':'button'}).withDescendant(locate('span').withText('Posting'))); // Posting button
    I.fillField(locate('div').withAttr({'role':'textbox'}),'test'); // Post textbox
    I.see('test');
    I.click('Kirim');
    I.wait(waitTime);
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    I.wait(waitTime);
    I.see('test');
}).tag('@facebook');

Scenario('post text and photo', async ({ I }) => { // Facebook doesn't handle spaces in email
    I.click(locate('div').withAttr({'aria-label':'Buat', role:'button'}));
    I.click(locate('div').withAttr({'role':'button'}).withDescendant(locate('span').withText('Posting'))); // Posting button
    I.fillField(locate('div').withAttr({'role':'textbox'}),'test photo'); // Post textbox
    I.see('test photo');
    await makeFakeAvatar('testAvatar.jpg');
    I.click('Foto/video');
    I.attachFile('form input[type="file"]', 'testAvatar.jpg');
    I.click('Kirim');
    I.wait(waitTime);
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    I.wait(waitTime);
    I.see('test photo');
}).tag('@facebook');

Scenario('upload non-image file on photo post', async ({ I }) => { // Facebook doesn't handle spaces in email
    I.click(locate('div').withAttr({'aria-label':'Buat', role:'button'}));
    I.click(locate('div').withAttr({'role':'button'}).withDescendant(locate('span').withText('Posting'))); // Posting button
    I.fillField(locate('div').withAttr({'role':'textbox'}),'test photo'); // Post textbox
    I.see('test photo');
    await makeFakeTextFile('fakeText.txt');
    I.click('Foto/video');
    I.attachFile('form input[type="file"]', 'fakeText.txt'); // File is uploaded but no picture is shown
    I.click('Kirim');
    I.wait(waitTime);
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    I.wait(waitTime);
    I.see('test photo');
}).tag('@facebook');