Feature('game');

Before(({ I }) => {
    login('facebook');
})

Scenario('open a game (cooking center)', async ({ I }) => {
    I.amOnPage('https://www.facebook.com/gaming/play/?store_visit_source=games_bookmark');
    I.click('Mainkan Game');
    I.click('Cooking Center');
    I.wait(10);
    I.see('SEDANG BERMAIN');
});