Feature('student status');

Before(({ login }) => {
    login('six');
});

Scenario('open student status', async ({ I }) => {
    I.click(locate('a').withText('Status Mahasiswa').last());
    I.waitForText('Data Mahasiswa', 10);
});