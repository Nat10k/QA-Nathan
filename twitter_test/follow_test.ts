import { time } from 'console';
import * as dotenv from 'dotenv';

dotenv.config({path:'./twitter_test/.env'});
const friend = process.env.TWITTER_FRIEND_ID;

Feature('follow');

Before(({ I, login }) => {
    login('user');
    I.wait(5);
});

Scenario('Follow random person', async ({ I }) => {
    I.scrollPageToBottom();
    I.see('Who to follow');
    I.click('Follow');
    I.see('Following');
});

Scenario('search friend to follow',  async ({ I }) => {
    I.click({css:'[data-testid="AppTabBar_Explore_Link"'});
    I.fillField('Search', friend);
    I.click('Search for');
    I.click('Follow');
    I.see('Following');
});

Scenario('unfollow all', async ({ I }) => {
    I.click({css:'[data-testid="AppTabBar_Profile_Link"]'});
    I.wait(2);
    I.click(locate('a').withText('Following'));
    // I.click('Following');
    I.executeScript(() => {
        var regExp = new RegExp('^Following @*');
        const followButtons = document.querySelectorAll('button');
        console.log(followButtons);
        const filteredButtons = Array.from(followButtons).filter(button => {
            return regExp.test(button.ariaLabel);
        });
        console.log(filteredButtons);
        var delay = 1000;
        filteredButtons.forEach((e) => {
            if (e instanceof HTMLElement) {
                e.click();
                setTimeout(() => {
                    const unfollowConfirm = document.querySelector('[data-testid="confirmationSheetConfirm"]');
                    if (unfollowConfirm instanceof HTMLElement) {
                        unfollowConfirm.click();
                    }
                }, delay);
            }
        });
    });
    I.dontSee('Following');
});