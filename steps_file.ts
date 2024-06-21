// in this file you can append custom step methods to 'I' object
const waitTime = 5;
export = function() {
  return actor({
      openSignUp: function() {
        this.amOnPage('/');
        this.click('Sign up');
        this.wait(waitTime);
      },
      openLogIn: function() {
        this.amOnPage('/');
        this.click('Log in');
        this.wait(waitTime);
      },
  });
}
