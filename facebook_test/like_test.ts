Feature('like');

Before(({ login }) => {
    login('facebook');
})

Scenario('like self post', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    // Like top post in home page
    I.scrollPageToBottom();
    I.click(locate('div').withAttr({'aria-label':'Suka', role:'button'}).inside(locate('div').withClassAttr('x9f619 x1n2onr6 x1ja2u2z x78zum5 x2lah0s x1qughib x1qjc9v5 xozqiw3 x1q0g3np x150jy0e x1e558r4 xjkvuk6 x1iorvi4 xwrv7xz x8182xy x4cne27 xifccgj')));
    // Like all post in home page
    I.executeScript(() => document.querySelectorAll('[aria-label="Suka"]').forEach(e => {
        if (e instanceof HTMLElement) {
            e.click();
        }
    }));
});

