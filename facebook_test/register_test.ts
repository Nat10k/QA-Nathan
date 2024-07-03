import * as dotenv from 'dotenv';

dotenv.config({path:'./facebook_test/.env'});
const email = process.env.FACEBOOK_EMAIL;
const firstName = process.env.FACEBOOK_FIRST_NAME;
const lastName = process.env.FACEBOOK_LAST_NAME;
const password = process.env.FACEBOOK_PASSWORD;
const baseURL = "https://id-id.facebook.com"

Feature('register facebook');

Before(({ I }) => {
    I.amOnPage(baseURL);
    I.click('Buat akun baru');
})

Scenario('empty fields', async ({ I }) => {
    I.click('websubmit');
    I.see('Daftar');
    I.fillField('firstname', firstName);
    I.click('websubmit');
    I.see('Daftar');
});

Scenario('invalid email', async ({ I }) => { // Facebook doesn't handle spaces in email
    // Fill other fields first
    I.fillField('firstname', firstName);
    I.fillField('lastname', lastName);
    I.selectOption('#year', '2003');
    I.fillField('reg_passwd__', secret(password));
    I.checkOption('Laki-laki');

    // Search based on name
    I.fillField('reg_email__', '');
    // Search based on class
    I.click('websubmit');
    I.seeElement(locate('input').withAttr({'aria-invalid':'true'}));
    // Invalid email format
    I.fillField('reg_email__', 'test 123');
    I.click('websubmit');
    I.seeElement(locate('input').withAttr({'aria-invalid':'true'}));

    I.fillField('reg_email__', 'test 123@g.com');
    I.fillField('reg_email_confirmation__', 'test 123@g.com');
    I.click('websubmit');
    I.wait(5);
    I.seeElement('#reg_error_inner');

    I.fillField('reg_email__', 'test123@981try.com');
    I.fillField('reg_email_confirmation__', 'test123@981try.com');
    I.click('websubmit');
    I.wait(5);
    I.seeElement('#reg_error_inner');
});

Scenario('invalid password',  async ({ I }) => {
    // Fill other fields first
    I.fillField('firstname', firstName);
    I.fillField('lastname', lastName);
    I.selectOption('#year', '2003');
    I.fillField('reg_email__', email);
    I.fillField('reg_email_confirmation__', email);
    I.checkOption('Laki-laki');
    
    // Search field by label
    I.fillField('reg_passwd__', 'ab'); // < 6 char
    I.click('websubmit');
    I.wait(5);
    I.seeElement('#reg_error_inner');
    I.fillField('reg_passwd__', 'abcdefghijk'); // no number - facebook lolos
    I.click('websubmit');
    I.wait(5);
    I.seeElement('#reg_error_inner');
    I.fillField('reg_passwd__', '1234567890'); // no letter
    I.click('websubmit');
    I.wait(5);
    I.seeElement('#reg_error_inner');
});

Scenario('complete signup',  async ({ I }) => {
    I.fillField('firstname', firstName);
    I.fillField('lastname', lastName);
    I.selectOption('#year', '2003');
    I.fillField('reg_email__', email);
    I.fillField('reg_email_confirmation__', email);
    I.checkOption('Laki-laki');
    I.fillField('reg_passwd__', secret(password));
    I.click('websubmit');
    I.wait(5);
    I.see(firstName);
});