Feature('game');

Before(({ login }) => {
    login('facebook');
})

Scenario('open a game (cooking center)', async ({ I }) => {
    I.amOnPage('https://www.facebook.com/gaming/play/?store_visit_source=games_bookmark');
    I.click('Mainkan Game');
    I.click(locate('a').withAttr({role:'link'}).withClassAttr('x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x87ps6o x1lku1pv x1rg5ohu x1a2a7pz x1qpq9i9 xdney7k xu5ydu1 xt3gfkd xh8yej3'));
    I.wait(10);
    I.see('SEDANG BERMAIN');
});