Feature('spotify search').tag('@spotify');

const waitTime = 10;

Before(({ login }) => {
    login('spotify');
});

Scenario('search an artist', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Search'}));
    I.fillField(locate('input').inside(locate('form').withAttr({role:'search'})), 'Dewa');
    I.waitForElement(locate('a').withAttr({'title':'Dewa 19'}), 30);
});

Scenario('search a song', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Search'}));
    I.fillField(locate('input').inside(locate('form').withAttr({role:'search'})), 'Show');
    I.waitForElement(locate('a').withAttr({'title':'Show'}), 30);
});

Scenario('choose a category filter', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Search'}));
    I.fillField(locate('input').inside(locate('form').withAttr({role:'search'})), 'Show');
    I.waitForElement(locate('a').withAttr({'title':'Show'}), 30);
    I.click(locate('a').withDescendant(locate('span').withText('Albums')));
    I.waitForElement(locate('p').withAttr({'title':'Ado "Ready For My Show Playlist"'}));
});

export {}