import * as dotenv from 'dotenv';

dotenv.config({path:'./gmail_test/.env'});
const email = process.env.GMAIL_EMAIL;
const emailNoAt = process.env.GMAIL_EMAIL_NO_AT;
const firstName = process.env.GMAIL_FIRST_NAME;
const password = process.env.GMAIL_PASSWORD;
const phone = process.env.GMAIL_VERIF_PHONE;
const baseURL = "https://gmail.com/"

const waitTime = 20;

Feature('register gmail');

Before(({ I }) => {
    I.amOnPage(baseURL);
    I.see('Sign in');
    I.click('Sign in');
    // I.click(locate('button').withText('Create account'));
    I.forceClick(locate('li').withAttr({role:'menuitem'}).withText('For my personal use'));
    I.wait(5);
});

Scenario('empty fields', async ({ I }) => {
    I.click('Next');
    I.see('Enter first name');
    I.fillField('First name', firstName);
    I.click('Next');
    I.click('Next');
    I.see('Please fill in a complete birthday');
    I.see('Please select your gender');
    I.selectOption('Month','February');
    I.fillField('Day','20');
    I.fillField('Year', '2001');
    I.click('Next');
    I.dontSee('Please fill in a complete birthday');
    I.see('Please select your gender');
    I.selectOption('Gender', 'Male');
    I.click('Next');
    
    const isUsername = await I.grabNumberOfVisibleElements('[role="radiogroup"]');
    if (isUsername === 0) {
        I.click('Next');
        I.see('Enter a Gmail address');
        I.fillField('Username', emailNoAt);
    } else {
        I.click('Next');
        I.see('Choose a Gmail address');
        I.click('Create your own Gmail address');
        I.click('Next');
        I.see('Enter a Gmail address');
        I.fillField('Create a Gmail address', emailNoAt);
    }
    I.click('Next');
    I.click('Next');
    I.see('Enter a password');
    I.fillField('Password', secret(password));
    I.fillField('Confirm', secret(password));
    I.click('Next');
    I.click('Next');
    I.see('Please enter a phone number');
}).tag('@gmail');

Scenario('invalid email, password, phone',  async ({ I }) => {
    I.fillField('First name', firstName);
    I.click('Next');
    I.selectOption('Month','February');
    I.fillField('Day','20');
    I.fillField('Year', '2001');
    I.selectOption('Gender', 'Male');
    I.click('Next');

    // Email
    const isUsername = await I.grabNumberOfVisibleElements('[role="radiogroup"]');
    var fieldName = 'Username';
    if (isUsername > 0) {
        I.click('Create your own Gmail address');
        fieldName = 'Create a Gmail address';
    }
    I.fillField(fieldName, 'abcde');
    I.click('Next');
    I.see('Sorry, your username must be between 6 and 30 characters long');
    I.fillField(fieldName, '*&jd.-131');
    I.click('Next');
    I.see('Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed');
    I.fillField(fieldName, emailNoAt);
    I.click('Next');

    // Password
    // Passwords don't match
    I.fillField('Password', secret(password));
    I.fillField('Confirm', 'blkdoea');
    I.click('Next');
    I.see('Those passwords did');

    // < 8 characters
    I.fillField('Password', 'abcd');
    I.fillField('Confirm', 'abcd');
    I.click('Next');
    I.see('Use 8 characters or more for your password');
    
    // Only numbers
    I.fillField('Password', '12345678');
    I.fillField('Confirm', '12345678');
    I.click('Next');
    I.see('Please choose a stronger password. Try a mix of letters, numbers, and symbols.');
    
    I.fillField('Password', secret(password));
    I.fillField('Confirm', secret(password));
    I.click('Next');

    // Phone number
    I.fillField('Phone number', 'jjiahu2');
    I.click('Next');
    I.see('This phone number format is not recognized. Please check the country and number.');
}).tag('@gmail');

Scenario('complete register',  async ({ I }) => {
    I.fillField('First name', firstName);
    I.click('Next');
    I.selectOption('Month','February');
    I.fillField('Day','20');
    I.fillField('Year', '2001');
    I.selectOption('Gender', 'Male');
    I.click('Next');

    // Email
    const isUsername = await I.grabNumberOfVisibleElements('[role="radiogroup"]');
    var fieldName = 'Username';
    if (isUsername > 0) {
        I.click('Create your own Gmail address');
        fieldName = 'Create a Gmail address';
    }
    I.fillField(fieldName, emailNoAt);
    I.click('Next');

    // Password
    I.fillField('Password', secret(password));
    I.fillField('Confirm', secret(password));
    I.click('Next');

    // Phone number
    I.fillField('Phone number', phone);
    I.click('Next');
    I.say('Please handle captcha');
    pause();
}).tag('@gmail');