Feature('class schedule');

Before(({ login }) => {
    login('six');
});

Scenario('open class schedule', async ({ I }) => {
    I.click(locate('a').withText('Kelas').last());
    I.waitForText('Jadwal Perkuliahan Mahasiswa', 10);
});