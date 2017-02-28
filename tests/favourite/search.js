'use strict';

module.exports = {
  tags: ['favourite', 'search'],
  beforeEach: function (browser) {
    browser.url(browser.launch_url);
  },
  "Favourite should be part of search": function (browser) {
    const myFavourites = browser.page.myFavourites();
    const favouriteName = "A favourite that should show up in search results";
    myFavourites.saveHomeFavourite("Vestre vei 21, Asker", favouriteName);
    browser.page.searchFields().setDestination("");
    myFavourites.verifyFavouriteInSearchResult(favouriteName);
    browser.end();
  }
};
