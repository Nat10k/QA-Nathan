Feature('listen to music').tag('@spotify');

const waitTime = 10;

Before(({ login }) => {
    login('spotify');
});

Scenario('open the first of the recommended songs on top of page', async ({ I }) => {
    I.click(locate('div').withAttr({role:'button'}).withClassAttr('CardButton-sc-g9vf2u-0 doNNoL').first());
    I.wait(3);
    I.click(locate('button').withAttr({'data-testid':'play-button'}).last());
    I.waitForElement(locate('aside').withAttr({'aria-label':'Now playing view'}), 30);
});

Scenario('open a shows to try', async ({ I }) => {
    I.forceClick(locate('div').withAttr({role:'button'}).inside(locate('section').withAttr({'aria-label':'Shows to try'})).first());
    I.wait(3);
    I.click(locate('button').withAttr({'data-testid':'play-button'}).first());
    I.waitForElement(locate('aside').withAttr({'aria-label':'Now playing view'}), 30);
    I.click(locate('button').withAttr({'aria-label':'Pause'}).inside(locate('footer')));
});

export {}