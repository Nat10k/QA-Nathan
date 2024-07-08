import { makeFakeAvatar } from "../data-faker";

Feature('spotify profile').tag('@spotify');

Before(({ login }) => {
    login('spotify');
});

Scenario('open profile', async ({ I }) => {
    I.click(locate('button').withChild(locate('span').withText('N')).inside(locate('header')));
    I.click(locate('a').withChild(locate('span').withText('Profile')).inside(locate('div').withAttr({id:'context-menu'})));
    I.waitForText('Profile', 30);
});

Scenario('change profile picture', async ({ I }) => {
    I.click(locate('button').withChild(locate('span').withText('N')).inside(locate('header')));
    I.click(locate('a').withChild(locate('span').withText('Profile')).inside(locate('div').withAttr({id:'context-menu'})));
    I.waitForText('Profile', 30);

    I.click(locate('button').withAttr({'data-testid':'more-button'}));
    I.click(locate('button').withDescendant(locate('span').withText('Edit profile')));
    await makeFakeAvatar('fakeAvatar.jpg');
    I.attachFile(locate('input').withAttr({type:'file','data-testid':'image-file-picker'}).inside(locate('div').withAttr({role:'dialog'})), 'fakeAvatar.jpg');
    I.wait(5);
    I.click(locate('button').withChild(locate('span').withText('Save')).inside(locate('div').withAttr({role:'dialog'})));
    I.waitForInvisible(locate('div').withAttr({role:'dialog'}), 5);
});

Scenario('delete profile picture', async ({ I }) => {
    I.amOnPage('https://open.spotify.com/user/316ocudvvtlazgimc5bd2mxmfuye');

    I.click(locate('button').withAttr({'data-testid':'more-button'}));
    I.click(locate('button').withDescendant(locate('span').withText('Edit profile')));
    I.click(locate('button').withChild(locate('span').withText('Remove photo')).inside(locate('div').withAttr({role:'dialog'})));
    I.click(locate('button').withChild(locate('span').withText('Save')).inside(locate('div').withAttr({role:'dialog'})));
    I.waitForInvisible(locate('div').withAttr({role:'dialog'}), 5);
});

export {}