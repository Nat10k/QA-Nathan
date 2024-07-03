Feature('comment');

Before(({ I }) => {
    login('facebook');
})

Scenario('comment on one post', async ({ I }) => {
    // Comment on first found post
    I.click(locate('div').withAttr({'aria-label':'Beri komentar'}).first());
    I.fillField(locate('div').withAttr({'aria-label':'Tulis komentar...', role:'textbox'}).first(), 'hellow world');
    I.click(locate('div').withAttr({'aria-label':'Komentari', role:'button'}).first());
});

Scenario('100.000 words comment', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    I.fillField(locate('div').withAttr({'aria-label':'Tulis komentar...', role:'textbox'}), process.env.LONG_COMMENT); // Facebook has character limit although not shown
    I.click(locate('div').withAttr({'aria-label':'Komentari', role:'button'}).first());
});