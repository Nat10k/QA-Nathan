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
  I.waitForElement(locate('a').withAttr({'title':val}), 30);
});

When('I click {string} category', (val) => {
  // From "features\spotify_search.feature" {"line":23,"column":5}
  I.click(locate('a').withDescendant(locate('span').withText(val)));
});

Then('I should see {string} in the filtered results', (val) => {
  // From "features\spotify_search.feature" {"line":25,"column":5}
  I.waitForElement(locate('p').withAttr({'title': val}));
});

export {}