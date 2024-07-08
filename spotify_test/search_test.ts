import * as dotenv from 'dotenv';
dotenv.config({path:'./spotify_test/.env'});

const longText = process.env.LONG_TEXT;

Feature('spotify search').tag('@spotify');

Before(({ login }) => {
    login('spotify');
});

Scenario('search an artist', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Search'}));
    I.fillField(locate('input').inside(locate('form').withAttr({role:'search'})), 'Dewa');
    I.waitForText('Dewa', 20, '#searchPage');
});

Scenario('search a song', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Search'}));
    I.fillField(locate('input').inside(locate('form').withAttr({role:'search'})), 'Show');
    I.waitForText('Show', 20, '#searchPage');
});

Scenario('choose a category filter', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Search'}));
    I.fillField(locate('input').inside(locate('form').withAttr({role:'search'})), 'Show');
    I.click(locate('a').withDescendant(locate('span').withText('Albums')));
    I.waitForText('Ado "Ready For My Show Playlist"', 20, '#searchPage');
});

Scenario('really long search', async ({ I }) => { // Terdapat batas panjang karakter di searchbox
    I.click(locate('a').withAttr({'aria-label':'Search'}));
    I.fillField(locate('input').inside(locate('form').withAttr({role:'search'})), longText);
    I.waitForText('No results found', 5);
})

export {}