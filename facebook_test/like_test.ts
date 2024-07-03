Feature('like');

Before(({ login }) => {
    login('facebook');
})

Scenario('like self post', async ({ I }) => {
    I.click('Beranda');
    // Like top post in home page
    I.click('Suka');
    // Like all post in home page
    I.executeScript(() => document.querySelectorAll('[aria-label="Suka"]').forEach(e => {
        if (e instanceof HTMLElement) {
            e.click();
        }
    }));
});

