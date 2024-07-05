Feature('comment');

Before(({ login }) => {
    login('facebook');
});

Scenario('comment on one post', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    I.wait(2);
    I.scrollPageToBottom();
    // Comment on first found post
    I.click(locate('div').withAttr({'aria-label':'Beri komentar'}).first());
    I.fillField(locate('div').withAttr({'aria-label':'Tulis komentar...', role:'textbox'}).first(), 'hellow world');
    I.click(locate('div').withAttr({'aria-label':'Komentari', role:'button'}).first());
}).tag('@facebook');

Scenario('100.000 words comment', async ({ I }) => {
    I.click(locate('a').withAttr({'aria-label':'Beranda'}));
    I.wait(2);
    I.scrollPageToBottom();
    I.fillField(locate('div').withAttr({'aria-label':'Tulis komentar...', role:'textbox'}), process.env.LONG_COMMENT); // Facebook has character limit although not shown
    I.click(locate('div').withAttr({'aria-label':'Komentari', role:'button'}).first());
}).tag('@facebook');