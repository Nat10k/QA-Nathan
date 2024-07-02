const { I, login } = inject();

Given('I am logged in as a user', () => {
    login('user');
});

Given('I am on the welcome page', () => {
  // From "features\facebook_marketplace.feature" {"line":7,"column":5}
  I.amOnPage('/?sk=welcome');
  I.executeScript(() => {console.log('welcome')});
  I.wait(5);
});

When('I click Marketplace', () => {
  // From "features\facebook_marketplace.feature" {"line":8,"column":5}
  I.click('Lainnya');
  pause();
//   I.waitForText('Marketplace', 20);
//   I.click(locate('a[href="https://www.facebook.com/marketplace/?ref=bookmark"]').inside(locate('div').withClassAttr('x78zum5 xdt5ytf x1iyjqo2 x1us19tq').withAttr({'data-visualcompletion':"ignore-dynamic"})));
//   I.waitForText('Pilihan Hari Ini', 20);
});

Then('I should see items in the marketplace', () => {
  // From "features\facebook_marketplace.feature" {"line":9,"column":5}
  I.see('Pilihan Hari Ini');
});

Given('I am on the marketplace page', () => {
  // From "features\facebook_marketplace.feature" {"line":12,"column":5}
  I.amOnPage('/marketplace/?ref=bookmark');
});

When('I click one of the items', () => {
  // From "features\facebook_marketplace.feature" {"line":13,"column":5}
  I.click({xpath:'//a[matches(@href, "^/marketplace/item/*")]'});
  I.wait(10);
});

Then('I should see details of the item', () => {
  // From "features\facebook_marketplace.feature" {"line":14,"column":5}
  I.see('Ditawarkan di');
});
