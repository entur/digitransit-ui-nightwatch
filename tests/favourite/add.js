'use strict';

module.exports = {
  tags: ['favourite'],
  beforeEach: function (browser) {
    browser.url(browser.launch_url);
  },
  "Add my home address as favourite": function (browser) {
    const myFavourites = browser.page.myFavourites();
    const favouriteName = "Home sweet home";
    myFavourites.saveHomeFavourite("Vestre vei 21, Asker", favouriteName);
    myFavourites.verifyFavouriteAvailable(favouriteName);
    browser.end();
  }
};
