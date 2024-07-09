import * as dotenv from 'dotenv';

dotenv.config({path:'./twitter_test/.env'});
const friend = process.env.TWITTER_FRIEND_ID;

Feature('follow').tag('@twitter');

Before(({ I, login }) => {
    login('twitter');
    I.wait(5);
});

Scenario('Follow random person', async ({ I }) => {
    I.scrollPageToBottom();
    I.scrollTo(locate('aside').withAttr({'aria-label':'Who to follow'}));
    I.see('Who to follow');
    I.click('Follow');
    I.see('Following');
});

Scenario('search friend to follow',  async ({ I }) => {
    I.click(locate('a').withAttr({'data-testid':'AppTabBar_Explore_Link'}).inside(locate('nav').withAttr({role:'navigation'})));
    I.fillField('Search', friend);
    I.click('Search for');
    I.click('Follow');
    I.see('Following');
});

Scenario('unfollow all', async ({ I }) => {
    I.click('a[aria-label="Profile"]');
    I.wait(2);
    I.click(locate('a').withText('Following'));
    const followingCount = await I.grabNumberOfVisibleElements(locate('button').withAttr({'data-testid':'UserCell'}));
    for (let i=0; i<followingCount; i++) {
        I.click('button[aria-label^="Following @"]');
        I.click(locate('button').withAttr({'data-testid':'confirmationSheetConfirm'}).inside(locate('div').withAttr({'data-testid':'confirmationSheetDialog'})));
    }
    // I.click('Following');
    I.dontSee('Following');
});