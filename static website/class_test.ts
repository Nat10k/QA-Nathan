// Base URL : https://informatika.stei.itb.ac.id/~rinaldi.munir/
Feature('class_access');

Scenario('open website', async ({ I }) => {
    I.amOnPage('https://informatika.stei.itb.ac.id/~rinaldi.munir/');
    I.see('Homepage Rinaldi Munir');
});

Scenario('Open Kriptografi S1 class', async ({ I }) => {
    I.amOnPage('https://informatika.stei.itb.ac.id/~rinaldi.munir/');
    // Click link by text
    I.click('Kriptografi (S1-IF)');
    I.see('IF4020');
});

Scenario('Open Kriptografi S1 Semester II 2022/2023', async ({ I }) => {
    I.amOnPage('https://informatika.stei.itb.ac.id/~rinaldi.munir/Kriptografi/kriptografi.htm');
    I.click('Semester II Tahun 2022/2023');
    I.wait(5);
    I.see('IF4020 Kriptografi - Semester II Tahun 2022/2023');
    I.click("Semester II Tahun 2022/2023");
    I.click('02-Kriptografi klasik (Bagian 1)');
});
