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
  I.click('Lainnya');
  I.waitForText('Marketplace', 20);
  I.forceClick('Marketplace');
  I.waitForText('Pilihan Hari Ini', 20);
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
  I.click('a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.x1sur9pj.xkrqix3.x1lku1pv:nth-child(1)');
});

Then('I should see details of the item', () => {
  // From "features\facebook_marketplace.feature" {"line":14,"column":5}
  I.waitForText('Detail', 10);
});
