import { faker } from '@faker-js/faker';
import * as fs from 'fs';

// Text data
fs.writeFileSync('test.txt', "Airline : " + faker.airline.airline().name + "\nAircraft Type : " + faker.airline.aircraftType());
// var testFile = fs.readFileSync('test.txt');

// SVG data
// var img = faker.image.dataUri({type:"svg-base64"});
// var data = img.replace("data:image/svg+xml;base64,", "");
// fs.writeFileSync('image.txt', data);
// var buf = Buffer.from(data, 'base64');
// fs.writeFileSync('testImg.svg', buf);

Feature('File upload')

Scenario('upload file', ({ I }) => {
    I.amOnPage('https://jumpshare.com/file-sharing/txt');
    I.attachFile('#guest-file-upload', 'test.txt');
    I.waitForVisible('.file_link', 20);
    I.click('Share Your Code');
    I.wait(5);
    I.see('Analytics');
})