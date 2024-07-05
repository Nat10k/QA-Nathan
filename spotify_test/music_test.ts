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

// Scenario('invalid password',  async ({ I }) => {
//     I.fillField('#username', username);
//     I.waitForValue('#username', username, 5);
//     I.click('.ButtonInner-sc-14ud5tc-0');
//     I.wait(waitTime);
//     I.see('Create a password');
//     // Search field by label
//     I.fillField('Password', 'ab'); // < 10 char
//     I.click('Next');
//     I.see('Create a password'); // Still on page
//     I.fillField('Password', 'abcdefghijk'); // no number
//     I.click('Next');
//     I.see('Create a password'); // Still on page
//     I.fillField('Password', '1234567890'); // no letter
//     I.click('Next');
//     I.see('Create a password'); // Still on page
// });

// Scenario('complete signup',  async ({ I }) => {
//     I.fillField('#username', username);
//     I.waitForValue('#username', username, 5);
//     I.click('Next');
//     I.wait(waitTime);
//     I.see('Create a password');
//     I.fillField('Password', secret(password));
//     I.waitForValue('#new-password', password, 5);
//     I.click('Next');
//     I.wait(waitTime);
//     I.fillField('Name', 'Nathan');
//     I.waitForValue('#displayName', 'Nathan', 5);
//     I.pressKey('Enter');
//     I.see('Please enter your date of birth.');
//     I.fillField('dd','28');
//     I.selectOption('month','February');
//     I.fillField('year', 2001);
//     I.pressKey('Enter');
//     I.dontSee('Please enter your date of birth.');
//     I.checkOption('Man');
//     I.wait(2);
//     I.click('Next');
//     I.wait(waitTime);
//     I.click('Sign up');
// });