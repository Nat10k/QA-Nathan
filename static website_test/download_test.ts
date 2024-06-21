// Base URL : https://informatika.stei.itb.ac.id/~rinaldi.munir/
Feature('download_slide');

Scenario('Download Kriptografi klasik (Bagian 1) S1 Semester II 2022/2023', async ({ I }) => {
    I.amOnPage('https://informatika.stei.itb.ac.id/~rinaldi.munir/Kriptografi/kriptografi.htm');
    I.click('Semester II Tahun 2022/2023');
    I.wait(10);
    I.see('IF4020 Kriptografi - Semester II Tahun 2022/2023');
    I.click("Semester II Tahun 2022/2023");
    I.handleDownloads();
    I.click('02-Kriptografi klasik (Bagian 1)');
    I.amInPath('output/downloads');
    I.waitForFile('02-Kriptografi-Klasik-Bagian1-(2023).pdf',15);
});
