import { makeFakeAvatar } from "../data-faker";

const { I, login } = inject();

Given('I am logged in as a user', () => {
  login('spotify');
});

Given('I am on the home page', () => {
  // From "features\spotify_music.feature" {"line":14,"column":5}
  I.amOnPage('https://open.spotify.com/');
});

When('I click the first song in my recommended list', () => {
  // From "features\spotify_music.feature" {"line":9,"column":5}
  I.click(locate('div').withAttr({role:'button'}).withClassAttr('CardButton-sc-g9vf2u-0 doNNoL').first());
  I.wait(3);
});

When('I click play', () => {
  // From "features\spotify_music.feature" {"line":16,"column":5}
  I.click(locate('button').withAttr({'data-testid':'play-button', 'aria-label':'Play'}).last());
});

Then('I should hear the music being played', () => {
  // From "features\spotify_music.feature" {"line":11,"column":5}
  I.waitForElement(locate('aside').withAttr({'aria-label':'Now playing view'}), 30);
});

When('I click one of the shows in shows to try section', () => {
  // From "features\spotify_music.feature" {"line":15,"column":5}
  I.forceClick(locate('div').withAttr({role:'button', 'aria-disabled':'false'}).inside(
    locate('div').withAttr({'data-testid':'grid-container'}).inside(locate('section').withAttr({'aria-label':'Shows to try'}))).first());
  I.wait(3);
});

Then('I should hear the podcast being played', () => {
  // From "features\spotify_music.feature" {"line":17,"column":5}
  I.waitForElement(locate('aside').withAttr({'aria-label':'Now playing view'}), 30);
});

When('I click the search button', () => {
  // From "features\spotify_search.feature" {"line":21,"column":5}
  I.click(locate('a').withAttr({'aria-label':'Search'}));
});

When('I search for {string}', (val) => {
  // From "features\spotify_search.feature" {"line":22,"column":5}
  I.fillField(locate('input').inside(locate('form').withAttr({role:'search'})), val);
});

Then('I should see {string} in the results', (val) => {
  // From "features\spotify_search.feature" {"line":17,"column":5}
  I.waitForText(val, 20, '#searchPage');
});

When('I click {string} category', (val) => {
  // From "features\spotify_search.feature" {"line":23,"column":5}
  I.click(locate('a').withDescendant(locate('span').withText(val)));
});

Then('I should see {string} in the filtered results', (val) => {
  // From "features\spotify_search.feature" {"line":25,"column":5}
  I.waitForText(val, 20, '#searchPage');
});

When('I click the profile button', () => {
  // From "features\spotify_profile.feature" {"line":10,"column":5}
  I.click(locate('button').withChild(locate('span').withText('N')).inside(locate('header')));
  I.click(locate('a').withChild(locate('span').withText('Profile')).inside(locate('div').withAttr({id:'context-menu'})));
});

Then('I should see profile', () => {
  // From "features\spotify_profile.feature" {"line":11,"column":5}
  I.waitForText('Profile', 30);
});

Given('I am on my profile page', () => {
  // From "features\spotify_profile.feature" {"line":14,"column":5}
  I.amOnPage('https://open.spotify.com/user/316ocudvvtlazgimc5bd2mxmfuye');
});

When('I click the more options button', () => {
  // From "features\spotify_profile.feature" {"line":15,"column":5}
  I.click(locate('button').withAttr({'data-testid':'more-button'}));
});

When('I click edit profile', () => {
  // From "features\spotify_profile.feature" {"line":16,"column":5}
  I.click(locate('button').withDescendant(locate('span').withText('Edit profile')));
});

When('I upload my profile picture', async () => {
  // From "features\spotify_profile.feature" {"line":17,"column":5}
  await makeFakeAvatar('fakeAvatar.jpg');
  I.attachFile(locate('input').withAttr({type:'file','data-testid':'image-file-picker'}).inside(locate('div').withAttr({role:'dialog'})), 'fakeAvatar.jpg');
  I.wait(5);
});

When('I save', () => {
  // From "features\spotify_profile.feature" {"line":18,"column":5}
  I.click(locate('button').withChild(locate('span').withText('Save')).inside(locate('div').withAttr({role:'dialog'})));
});

Then('I should see profile and my new profile picture', () => {
  // From "features\spotify_profile.feature" {"line":19,"column":5}
  I.waitForInvisible(locate('div').withAttr({role:'dialog'}), 5);
});

When('I click remove photo', () => {
  // From "features\spotify_profile.feature" {"line":24,"column":5}
  I.click(locate('button').withChild(locate('span').withText('Remove photo')).inside(locate('div').withAttr({role:'dialog'})));
});

Then('I should see profile and my profile picture empty', () => {
  // From "features\spotify_profile.feature" {"line":25,"column":5}
  I.waitForInvisible(locate('div').withAttr({role:'dialog'}), 5);
});

export {}