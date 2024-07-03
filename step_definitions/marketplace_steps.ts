const { I, login } = inject();

Given('I am logged in as a user', () => {
    login('user');
});

Given('I am on the welcome page', () => {
  // From "features\facebook_marketplace.feature" {"line":7,"column":5}
  I.amOnPage('/?sk=welcome');
  I.wait(5);
});

When('I click Marketplace', () => {
  // From "features\facebook_marketplace.feature" {"line":8,"column":5}
  I.click('[aria-label="Lainnya"]');
  I.waitForText('Marketplace', 20);
  I.forceClick('Marketplace');
});

Then('I should see items in the marketplace', () => {
  // From "features\facebook_marketplace.feature" {"line":9,"column":5}
  I.waitForText('Pilihan Hari Ini', 20);
});

Given('I am on the marketplace page', () => {
  // From "features\facebook_marketplace.feature" {"line":12,"column":5}
  I.amOnPage('/marketplace/?ref=bookmark');
});

When('I click one of the items', () => {
  // From "features\facebook_marketplace.feature" {"line":13,"column":5}
  I.click(locate('a').inside(locate('div').withClassAttr('x8gbvx8 x78zum5 x1q0g3np x1a02dak x1nhvcw1 x1rdy4ex xcud41i x4vbgl9 x139jcc6')));
});

Then('I should see details of the item', () => {
  // From "features\facebook_marketplace.feature" {"line":14,"column":5}
  I.waitForText('Detail', 10);
});

Given('I am on an item detail page', () => {
  // From "features\facebook_marketplace.feature" {"line":19,"column":5}
  I.amOnPage('/marketplace/?ref=bookmark');
  I.click(locate('a').inside(locate('div').withClassAttr('x8gbvx8 x78zum5 x1q0g3np x1a02dak x1nhvcw1 x1rdy4ex xcud41i x4vbgl9 x139jcc6')));
  I.waitForText('Detail', 10);
});

When('I click seller detail', () => {
  // From "features\facebook_marketplace.feature" {"line":20,"column":5}
  I.click('//a[contains(., "Detail penjual")]');
});

Then('I should see the seller\'s details', () => {
  // From "features\facebook_marketplace.feature" {"line":21,"column":5}
  I.seeInCurrentUrl('/marketplace/profile/');
});
